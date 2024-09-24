// app/page.js or HomePage.js
"use client";

import React from 'react';
import BestFoods from './components/BestFoods';
import ListOfMealType from './components/ListOfMealType';

export default function HomePage() {
  return (
    <div>
       
      {/* Weekday displayer and meal list will be rendered here */}
      <BestFoods />
      <ListOfMealType />
    </div> 
  );
}
