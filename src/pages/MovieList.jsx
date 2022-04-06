import React from 'react'
import { Card, Avatar ,Rate} from 'antd';

import {useHistory} from 'react-router-dom';

// css
import './datagame.css';
// ANT DESIGN
import {ArrowRightOutlined} from '@ant-design/icons';
import { Button,Tag } from 'antd';
import {UserContext} from '../Global/UseContext';



const MovieList = (item) => {
  const history = useHistory();
   
    const {Meta} = Card;

    return (
<>
     
    <div style={{margin:'10px'}}>
    <Card
    hoverable
    style={{ width: 300 }}
    cover={
      <div className='card-image' style={{height:'29vh',overflow:'hidden'}}>
    <img alt="example" src={item.item.image_url}
    style={{width:'100%',overflow:'hidden'}}
     />
       </div>
     }
  >
    <Meta  title={item.item.title} description={item.item.description?.substring(0,30)+'...'} 
    avatar={<Avatar src={item.item.image_url} />}
    />
    <br/>
    <div >
     <Meta  description={item.item.genre}  />
      Rating :<Rate defaultValue={1} count={1} /> {item.item.rating}/10
    </div>
    
    <Button onClick={() => history.push(`detail/movie/${item.item.id}`)} type='primary' style={{backgroundColor:'#4781ec',marginTop:'10px',color:'#fff',textAlign:'left'}}>Read More <ArrowRightOutlined /> </Button>
    <br />

    

  </Card>
    </div>
    </>
  )
}

export default MovieList