import React from 'react'
import { Spin } from 'antd';

const Loading = () => {

    const example = {
        width:'100%',
        height:'90vh',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: '4px'
      }
  return (
        <div style={example}>
    <Spin  size='large' />
  </div>
  )
}

export default Loading