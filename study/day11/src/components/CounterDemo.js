import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, toggleCounter } from "../store/CounterActions";

const CounterDemo = () => {
    const counter = useSelector((state) => state.counter);
    const showCounter = useSelector((state) => state.showCounter);
    const dispatch = useDispatch();

    const incrementHandler = () => {
        dispatch(increment(5));
    }

    const decrementHandler = () => {
        dispatch(decrement(3));
    }

    const toggleCounterHandler = () => {
        dispatch(toggleCounter());
    }
    
    return (
        <div className="App">
            {showCounter && <p>Counter: {counter}</p>}
            <button onClick={incrementHandler}>Increment</button>
            <button onClick={decrementHandler}>Decrement</button>
            <button onClick={toggleCounterHandler}>Counter {showCounter ? 'hide' : 'show'}</button>
        </div>
    )
}

export default CounterDemo;