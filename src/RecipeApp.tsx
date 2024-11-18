import React, { useState } from 'react'
import useStore from './useStore';

interface Recipe {
  id: number;
  name: string;
  ingredients : string[];
  instructions : string;
}

const RecipeApp = () => {

  const {recipes , addRecipe , removeRecipe} = useStore();
  const [name, setName] = useState<string>("");
  
  const [ingredients, setingredients] = useState<string>("");
  
  const [instructions, setinstructions] = useState<string>("");

  const [edit, setEdit] = useState<Recipe | null>(null);

  // methods
  const handleAddRecipe = ( )=>{
    if (
      name.trim() === "" ||
      instructions.trim() === "" ||
      ingredients.trim() === ""
    ) {
      return;
    }
    addRecipe({
      id: Date.now(),
      name,
      ingredients : ingredients.split(',').map((ingredients)=>ingredients),
      instructions
    })
    setName('');
    setingredients('');
    setinstructions('');
  }

  const handleEditRecipe = (recipe : Recipe)=>{
    setEdit(recipe);
    setName(recipe.name);
    setingredients(recipe.ingredients.join(","));
    setinstructions(recipe.instructions);
  }  

  const saveEditRecipe =()=>{
    if (
      name.trim() === "" ||
      instructions.trim() === "" ||
      ingredients.trim() === ""
    ) {
      return;
    }
    if(edit){
      removeRecipe(edit.id);
    }
    addRecipe({
      id: Date.now(),
      name,
      ingredients: ingredients.split(",").map((ingredients) => ingredients),
      instructions,
    });
    setEdit(null);
    setName("");
    setingredients("");
    setinstructions("");
    
  }

  return (
    <div className="min-h-screen min-w-screen bg-green-400 flex justify-center items-center">
      <div className="w-[35rem] h-[35rem] rounded-xl bg-slate-200">
        <div className="flex justify-center items-center w-full">
          <div className="heading">
            <h1
              className="text-2xl font-semibold shadow-lg p-1
            "
            >
              Recipe Book
            </h1>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col space-y-4 mt-4 ">
          <input
            placeholder="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="w-[60%] px-4 py-2 rounded-md focus:outline-green-400 "
          />
          <input
            type="text"
            value={ingredients}
            onChange={(e) => {
              setingredients(e.target.value);
            }}
            placeholder="Ingredients comma seperated"
            className="w-[60%] px-4 py-2 rounded-md focus:outline-green-400"
          />
          <textarea
            placeholder="Instructions"
            value={instructions}
            onChange={(e) => {
              setinstructions(e.target.value);
            }}
            className="w-[60%] px-4 py-2 rounded-md focus:outline-green-400"
          />
          <div className="flex justify-center w-[15rem]">
            {!edit ? (
              <button
                className="bg-green-400 py-1 px-2
              rounded-md hover:bg-green-500"
                onClick={handleAddRecipe}
              >
                Add Recipe
              </button>
            ) : (
              <div className="flex justify-between w-full">
                <button
                  className="bg-yellow-400 py-1 px-2 rounded-lg hover:bg-yellow-500"
                  onClick={saveEditRecipe}
                >
                  Save Edit
                </button>

                <button
                  className="bg-red-400 py-1 px-2 rounded-lg hover:bg-red-500"
                  onClick={() =>{ setEdit(null)
                    setName("");
                    setingredients("");
                    setinstructions("");
                  }
                  }
                >
                  Cancel Edit
                </button>
              </div>
            )}
          </div>
          <div className="w-[27rem]">
            <div>
              {recipes.map((recipe) => (
                <div className="flex bg-green-400 py-2 px-4 w-full rounded-md justify-between hover:scale-110">
                  <div
                    className="  flex 
              flex-col 
                "
                  >
                    <h1 className="text-x font-medium">{recipe.name}</h1>
                    <p className="text-md">{recipe.ingredients.join(",")}</p>
                  </div>
                  {!edit ? (
                    <div className="flex flex-col space-y-1">
                      <button
                        className="bg-yellow-400 py-1 px-2 rounded-lg hover:bg-yellow-500"
                        onClick={() => {
                          handleEditRecipe(recipe);
                        }}
                      >
                        Edit item
                      </button>
                      <button
                        className="bg-red-400 py-1 px-2 rounded-lg hover:bg-red-500"
                        onClick={() => removeRecipe(recipe.id)}
                      >
                        Delete item
                      </button>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeApp