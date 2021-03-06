import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

export default function Category() {
    const { id } = useParams();
    const { loading, error, data } = useFetch('http://localhost:1337/categories/' + id);
    if (loading) return <div className='spinner'> <Spinner animation="grow" variant="secondary" role="status"></Spinner></div>
    if (error) return <p className='messages'>Error fetching data :(</p>
    /*  console.log(data) */
    return (
        <div className='all-pets category'>
            {
                data.pets.map(pet => (
                    <Card className='card' style={{ width: '18rem' }} key={pet.id}>
                        <Link className='card-category' to={`/details/${pet.id}`}>{pet.name}</Link>

                        <Card.Img className='card-image' variant="top"
                            src={pet.image != null ?
                                `http://localhost:1337${pet.image.formats.small.url}`
                                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREzZGhBntOhRgkol_FdruXML_tX07XjyLcaw&usqp=CAU'
                            }
                        />
                        <Card.Body>
                            <Card.Text >
                                {pet.description.substring(0, 100)}...
                            </Card.Text>
                            <Link to={`/details/${pet.id}`}>Read more...</Link>
                        </Card.Body>
                    </Card>
                ))
            }
        </div >
    )
}
