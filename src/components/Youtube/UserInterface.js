import React, { Component } from 'react';
import axios from 'axios';
import Loading from "../Utilites/Loading";
import swal from 'sweetalert';
import ReactPlayer from 'react-player';

const SERVER_API_URL = 'https://youtube-scraping.vercel.app';
// const SERVER_API_URL = 'http://localhost:5000';

class UserInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoURL: '',
      transcriptionId: null,
      transcriptionStatus: 'pending',
      transcriptionResult: null,
      nutritionalData: null,
      totalCalories: null,
      error: null,
      loading: false,
    };
  }

  calculateTotalCalories = (nutritionalData) => {
    console.log('Nutritional Data:', nutritionalData);
  
    if (nutritionalData && typeof nutritionalData === 'object') {
      const totalCalories = Object.values(nutritionalData).reduce(
        (total, data) => {
          // Ensure data has the expected structure
          if (data && typeof data === 'object' && 'calories' in data) {
            return total + data.calories;
          } else {
            console.error('Invalid nutritional data structure:', data);
            return total;
          }
        },
        0
      );
  
      this.setState({ totalCalories });
    } else {
      console.error('Invalid or missing nutritional data:', nutritionalData);
      // Handle the error, e.g., set a default value for totalCalories
      this.setState({ totalCalories: null });
    }
  };
  
  
  extractVideoIdFromEmbed = (embeddedLink) => {
    const videoIdMatch = embeddedLink.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return videoIdMatch && videoIdMatch[1];
  };

  convertEmbeddedLinkToDirectURL = (embeddedLink) => {
    const videoId = this.extractVideoIdFromEmbed(embeddedLink);

    if (videoId) {
      // Construct the direct video URL
      const directVideoURL = `https://www.youtube.com/watch?v=${videoId}`;
      return directVideoURL;
    } else {
      // Invalid or unsupported embedded link
      return null;
    }
  };
  handleStartTranscription = () => {
    const { videoURL } = this.state;
    const directURL = this.convertEmbeddedLinkToDirectURL(videoURL);
    this.setState({ loading: true });

    if (!directURL) {
      // Handle invalid or unsupported embedded link
      swal({
        title: "Error",
        text: "Please enter a valid YouTube video URL",
        icon: "error",
        button: "OK",
      });
      this.setState({
        error: 'Invalid or unsupported embedded link',
        loading: false,
      });
      return;
    }

    // Set loading to true immediately upon clicking the button
    this.setState({ loading: true, error: null });

    // Start the transcription process on the server
    axios
      .post(`${SERVER_API_URL}/start-transcription`, { videoURL: directURL })
      .then((response) => {
        const { transcriptionId, result } = response.data;
        console.log('Transcription started. ID:', transcriptionId);

        // Update state with multiple changes in one call
        this.setState({
          transcriptionId,
          transcriptionResult: result,
        });
        const MAX_RETRIES = 3;
        let retryCount = 0;
        // Periodically check the status of the transcription
        const checkTranscriptionStatus = async () => {
          try {
            const statusResponse = await axios.get(
              `${SERVER_API_URL}/check-transcription-status/${transcriptionId}`
            );

            const { status, nutritionalData } = statusResponse.data;
            this.calculateTotalCalories(nutritionalData);
            console.log('Transcription status:', status);
            console.log('Nutritional Data:', nutritionalData);

            if (nutritionalData) {
              this.calculateTotalCalories(nutritionalData);
            }
            this.setState({
              transcriptionStatus: status,
              nutritionalData,
            });
            swal({
              title: "Nutritional Data Successful",
              text: "Thank you!",
              icon: "success",
              button: "OK",
            });
            if (status === 'failed') {
              this.setState({
                error: 'Transcription process failed',
              });
              console.error('Transcription process failed');
            } else if (status !== 'completed') {
              if (retryCount < MAX_RETRIES) {
                // Retry after a delay
                retryCount++;
                setTimeout(checkTranscriptionStatus, 5000); // Retry after 5 seconds
              } else {
                // Max retries reached, handle accordingly
                console.error('Max retries reached. Unable to check transcription status.');
              }// Check every 5 seconds
            } else {
              // Turn off loading when the transcription process is completed
              this.setState({ loading: false });
            }
          } catch (error) {
            this.setState({
              error: 'Error checking transcription status',
            });
            console.error('Error checking transcription status:', error);
          }
        };

        // Start checking the transcription status
        checkTranscriptionStatus();
      })
      .catch((error) => {
        swal({
          title: "Error",
          text: "Please enter a valid YouTube video URL",
          icon: "error",
          button: "OK",
        });
        this.setState({
          error: 'Error starting transcription',
          loading: false,
        });
        console.error('Error starting transcription:', error);
      });
  };

  render() {
    const { videoURL, transcriptionStatus, nutritionalData, error, loading } = this.state;

    return (
<div className='bg-light mt-0'>
<div className="container mx-5 mx-auto mt-5  transcription-resultt">
        <header className="myfitnesspal-header">
          <h1 className='fs-1 mb-3 fw-bold'>Transcription App</h1>
        </header>

        <div className="input-container">
          <input
            type="text"
            placeholder="Enter video URL"
            value={videoURL}
            onChange={(e) => this.setState({ videoURL: e.target.value })}
            style={{
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginRight: '10px',
              marginBottom: '10px',
              width: '300px',  // Adjust the width as needed
            }}
          />
<button
  onClick={this.handleStartTranscription}
  disabled={loading}
  style={{
    padding: '10px',
    fontSize: '16px',
    backgroundColor: loading ? '#ccc' : '#007bff',  // Use a different color when disabled
    color: '#fff',
    border: '1px solid #007bff',
    borderRadius: '5px',
    cursor: loading ? 'not-allowed' : 'pointer',  // Change cursor when disabled
  }}
>
  {loading ? 'Transcribing...' : 'Start Transcription'}
</button>
<div className='center'>
<div className='player-wrapper center my-4 videocl' style={{ display: 'flex', justifyContent: 'center' }}>
        <ReactPlayer
          url={videoURL}
          controls
          height="380px"
        />
      </div>
</div>
{loading && <Loading />}

          {error && <div className="error-message">{error}</div>}

          {(transcriptionStatus === 'completed' || transcriptionStatus === 'failed') && !loading ? (
            <div className="transcription-result">
              <h1 className='fs-1 fw-bold'>Nutritional Data</h1>
              {nutritionalData ? (
                <div className="container">
                  <h1 className='fs-3 fw-semibold'>Total Calories</h1>
                  <p>{this.state.totalCalories}</p>
                  {Object.entries(nutritionalData).map(([foodName, data]) => (
                    <ul key={foodName} className="nutritional-info-grid">
                      <li>
                        <p className="text-secondary fs-4 fs-semibold"> Foodname: {foodName} Calories: <span>{data.calories} Protein: {data.protein} Carbohydrates: {data.carbohydrates} Fat: {data.fat}</span></p>
                      </li>
                    </ul>
                  ))}
                </div>
              ) : (
                <div>
                  <p>Loading nutritional data...</p>
                  {/* Show loader image only when loading is true */}
                  {loading && <Loading />}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
</div>
    );
  }
}

export default UserInterface;
