import React from 'react'
import { Result } from 'antd';
import { Link } from 'react-router-dom';
import {Button} from '@chakra-ui/react'
function ContentNotFound() {
  return (
    <div>
        <Result
            title="Product Not Available"
            extra={
            <Button >
                <Link to='/contact'>Send Request</Link>
            </Button>
            }
        />
    </div>
  )
}

export default ContentNotFound

