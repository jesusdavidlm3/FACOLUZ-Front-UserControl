import { getAllChangeLogs } from '../client/client'
import { useEffect, useState } from 'react'
import { searchOnList } from '../context/lists'
import * as lists from '../context/lists'
import React from 'react'
import { List } from 'antd'


const ChangeLogs = () => {

    const [showList, setShowList] = useState([])

    useEffect(() => {
        getList()
        console.log('ejecute efecto')
    }, [])

    async function getList(){
        let res = await getAllChangeLogs()
        setShowList(res.data)
    }

    return(
        <div className="ChangeLogs Page">
            <h1>Registro de cambios</h1>
            <List bordered>
                {showList.map(item => (
                    <List.Item className='logItem'>
                        <h3>{item.modificatorName} {item.modificatorLastname}
                            {searchOnList(lists.changeLogsActionType, item.changeType)}
                            {item.modificatedName} {item.modificatedLastname} el
                            {new Date(item.dateTime).getUTCDate()} a las {new Date(item.dateTime).getTime()}
                        </h3>
                    </List.Item>
                ))}
            </List>
        </div>
    )
}

export default ChangeLogs