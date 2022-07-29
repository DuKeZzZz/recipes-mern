import React, {useState} from 'react';

function TagsInput(props) {
    const [isKeyReleased, setIsKeyReleased] = useState(false);

    const [input, setInput] = useState('');

    // const [tags, setTags] = useState([]);

    const tags = props.inputs.recipeTags;

    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };

    const onKeyDown = (e) => {
        const { key } = e;
        const trimmedInput = input.trim();
      
        if (key === ',' && trimmedInput.length && !tags.includes(trimmedInput)) {
          e.preventDefault();
          props.setInputs(values => ({...values, recipeTags: [...values.recipeTags, trimmedInput]}));
        //   setTags(prevState => [...prevState, trimmedInput]);
          setInput('');
        }
      
        if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
          const tagsCopy = [...tags];
          const poppedTag = tagsCopy.pop();
          e.preventDefault();
          props.setInputs(values => ({...values, recipeTags: tagsCopy}));
        //   setTags(tagsCopy);
          setInput(poppedTag);
        }
      
        setIsKeyReleased(false);
    };
      
    const onKeyUp = () => {
        setIsKeyReleased(true);
    }

    const deleteTag = (index) => {
        props.setInputs(values => {
            return ({...values, recipeTags: values.recipeTags.filter((tag, i) => i !== index)});
        });
        // setTags(prevState => prevState.filter((tag, i) => i !== index))
    }

    return (
        <div className="mb-3">
            <div className="tag-container">
                {tags.map((tag, index) => (
                <div key={index} className="tag">
                    {tag}
                    <button onClick={() => deleteTag(index)}>x</button>
                </div>
                ))}
                <input
                    name="tag"
                    value={input}
                    placeholder="Enter a tag"
                    onKeyDown={onKeyDown} 
                    onKeyUp={onKeyUp} 
                    onChange={onChange}
                />
            </div>
        </div>
    );
}

export default TagsInput;