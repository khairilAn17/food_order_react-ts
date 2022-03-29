import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

type TMeals = {
    id: string;
    name: string;
    description: string;
    price: number
}

const AvailableMeals = () => {
  const [ meals, setMeals] = useState<TMeals[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ httpError, setHttpError ] = useState<any>(null);

  const fetchMeals = async () => {
    setIsLoading(true);
    const res = await fetch("https://kue-kita-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json");
    if(!res.ok){
      throw new Error("something went wrong");
    }

    const resData = await res.json();

    const loadMeals = [];
    for(const key in resData){
      loadMeals.push({
        id: key,
        name: resData[key].name,
        description: resData[key].description,
        price: resData[key].price
      })
    }
    
    setMeals(loadMeals);
    setIsLoading(false);
  }
  
  useEffect(() => { 
    fetchMeals().catch(error => {
      setIsLoading(false);
      setHttpError(error.message);
    });

  }, []);
    const mealsList = meals.map(meal => <MealItem key={meal.id} name={meal.name} description={meal.description} price={meal.price} id={meal.id}/>);

    if(isLoading){
      return <section className={classes.MealsLoading}>
        Loading...
      </section>
    }

    if(httpError){
      return <section className={classes.MealsError}>
        {httpError}
      </section>
    }

    return <section className={classes.meals}>
        <Card>
        <ul>
            {mealsList}
        </ul>
        </Card>
    </section>
}

export default AvailableMeals;