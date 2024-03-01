import React from 'react'
import { Result } from 'antd';
import { Link } from 'react-router-dom';
import {Button} from '@chakra-ui/react'
function ContentNotFound() {
  return (
    <div>
        <Result
            title="No Product Selected Please Get Back to Products and Click Buy Now on your favourite Product"
            extra={
            <Button >
                <Link to='/shop'>View Products</Link>
            </Button>
            }
        />
    </div>
  )
}

export default ContentNotFound

