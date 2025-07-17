import { getAllChangeLogs } from '../client/client'
import { useEffect, useState } from 'react'
import { searchOnList } from '../context/lists'
import * as lists from '../context/lists'
import React from 'react'
import { Divider, List } from 'antd'
import { getTime, getDate } from '../functions/formatDates'


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
        <div className="UserAdministration Page">
            <Divider><h1>Registro de cambios</h1></Divider>
            <div className='listContainer'>
                <List bordered className='mainList'>
                    {showList.map(item => (
                        <List.Item className='logItem'>
                            <h3>{item.modificatorName} {item.modificatorLastname}{" "}
                                {searchOnList(lists.changeLogsActionType, item.changeType)}{" "}
                                {item.modificatedName} {item.modificatedLastname} el{" "}
                                {getDate(item.dateTime)} a las {getTime(item.dateTime)}
                            </h3>
                        </List.Item>
                    ))}
                </List>
            </div>
        </div>
    )
}

export default ChangeLogs