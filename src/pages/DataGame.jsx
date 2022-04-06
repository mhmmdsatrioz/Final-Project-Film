import React from 'react'
import { Card, Avatar ,Rate} from 'antd';
import {useHistory} from 'react-router-dom';

// css
import './datagame.css';

// ANT DESIGN
import {ArrowRightOutlined} from '@ant-design/icons';
import { Button } from 'antd';



const DataGame = (item) => {
  const history = useHistory();
  const {Meta} = Card;

  return (
    <div style={{margin:'20px'}}>
       <Card
    hoverable
    style={{ width: 300 }}
    cover={
      <div className='card-image' style={{height:'28vh',overflow:'hidden'}}>
    <img alt="example" src={item.item.image_url}
    style={{width:'100%',overflow:'hidden'}}
     />
       </div>
     }
  >
    <Meta  title={item.item.name} 
    description={item.item.genre} 
    avatar={<Avatar src={item.item.image_url} />}
    />
    <br/>
    <div >
     <Meta description={item.item.genre}  />
      Release : {item.item.release}
    </div>
    
    <Button type='primary' onClick={() => history.push(`detail/game/${item.item.id}`)} style={{backgroundColor:'#4781ec',color:'#fff',textAlign:'left'}}>Read More <ArrowRightOutlined /> </Button>
    <br />

  </Card>
    </div>
  )
}

export default DataGame