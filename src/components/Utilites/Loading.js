import React from 'react';
// import loading from "/public/picture/loader.gif"
const Loading = () => {
      return (
            <div className='loadings'>
                  {/* <img src={loading} alt="" /> */}
                  <img className='w-50' src="/picture/loader.gif" alt="" />
            </div>
      );
};

export default Loading;