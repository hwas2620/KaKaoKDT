const ChildComponent = (props) => {
    const handleChange = (e) => {
        props.onChange(e.target.value);
    }

    return (
        <div>
            <input type="text" onChange={handleChange} />
        </div>
    )
};

export default ChildComponent;