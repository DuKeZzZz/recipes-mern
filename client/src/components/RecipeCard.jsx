import React, {useEffect, useState} from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:5000" 
});

function RecipeCard(props) {
    const [img, setImg] = useState();

    const navigate = useNavigate();

    const s3Key = props.imgSource;

    const fetchImage = async function(s3Key) {
        const res = await client.get('/images/' + s3Key);

        setImg(res.data);
    }

    useEffect(() => {
        fetchImage(s3Key);
    }, [s3Key]);

    return(
        <Card style={{ width: '18rem' ,height: '24rem', margin:18}} onClick={() => {
            navigate(`/recipes/${props.title}`);
        }}>
            <div className='imageDiv'>
                <Card.Img variant="top" src={img} style={{ height:"100%", width: "100%", objectFit: "contain"}} />
            </div>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.prevText}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default RecipeCard;