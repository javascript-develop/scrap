// import React, { Component } from 'react';
// import axios from 'axios';
// import natural from 'natural';
// import './NutritionAnalyzer.css';

// class NutritionAnalyzer extends Component {
//   constructor() {
//     super();
//     this.state = {
//       extractedText: '',
//       nutritionalData: null,
//     };
//   }

//   analyzeText = async () => {
//     const { extractedText } = this.state;
//     const tokenizer = new natural.WordTokenizer();
//     const NER = natural.LexicalParser.foodEntityRecognition;
//     const tokens = tokenizer.tokenize(extractedText);
//     const recognizedEntities = NER.getEntities(tokens);
//     const foodItems = recognizedEntities.filter(entity => entity.type === 'food');

//     const nutritionalData = {
//       calories: 0,
//       protein: 0,
//       carbohydrates: 0,
//       fat: 0,
//     };

//     for (const foodItem of foodItems) {
//       await this.fetchNutritionalData(foodItem.text, nutritionalData);
//     }

//     this.setState({ nutritionalData });
//   };

//   fetchNutritionalData = async (foodItem, nutritionalData) => {
//     try {
//       const response = await axios.get(`https://api.nutritionix.com/v1_1/search/${foodItem}`, {
//         params: {
//           results: '0:1',
//           fields: 'nf_calories,nf_protein,nf_total_carbohydrate,nf_total_fat',
//           appId: 'YOUR_APP_ID', // Replace with your Nutritionix API App ID
//           appKey: 'YOUR_APP_KEY', // Replace with your Nutritionix API App Key
//         },
//       });

//       const itemData = response.data.hits[0].fields;

//       nutritionalData.calories += itemData.nf_calories;
//       nutritionalData.protein += itemData.nf_protein;
//       nutritionalData.carbohydrates += itemData.nf_total_carbohydrate;
//       nutritionalData.fat += itemData.nf_total_fat;
//     } catch (error) {
//       console.error(`Error fetching nutritional data for ${foodItem}:`, error);
//     }
//   };

// export default NutritionAnalyzer;
