import { getAllChangeLogs } from '../client/client'
import { useEffect, useState } from 'react'
import { searchOnList } from '../context/lists'
import * as lists from '../context/lists'
import React from 'react'
import { Divider, List } from 'antd'
import { getTime, getDate } from '../functions/formatDates'
import Pagination from "../components/Pagination"

const ChangeLogs = () => {

    const [showList, setShowList] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        getList(page)
    }, [page])

    async function getList(page){
        let res = await getAllChangeLogs(page)
        setShowList(res.data)
    }

    return(
        <div className="UserAdministration Page">
            <Divider className='PageTitle'><h1>Registro de cambios</h1></Divider>
            <div className='listContainer Content'>
                <List bordered className='mainList' size='small'>
                    {showList.map(item => (
                        <List.Item className='listItem'>
                            <h3>{item.modificatorName} {item.modificatorLastname}{" "}
                                {searchOnList(lists.changeLogsActionType, item.changeType)}{" "}
                                {item.modificatedName} {item.modificatedLastname} el{" "}
                                {getDate(item.dateTime)} a las {getTime(item.dateTime)}
                            </h3>
                        </List.Item>
                    ))}
                <Pagination page={page} setPage={setPage}/>
                </List>
            </div>
            <div className='EmptyFooter'/>
        </div>
    )
}

export default ChangeLogs