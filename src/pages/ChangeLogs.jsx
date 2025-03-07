import { getAllChangeLogs } from '../client/client'
import { useEffect, useState } from 'react'
import { searchOnList } from '../context/lists'
import * as lists from '../context/lists'
import React from 'react'


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
        <div className="ChangeLogs">
            <h1>Registro de cambios</h1>
            {showList.map(item => (
                <div className='logItem'>
                    <h4>{item.modificatorName} {item.modificatorLastname} {searchOnList(lists.changeLogsActionType, item.changeType)} {item.modificatedName} {item.modificatedLastname} el {item.dateTime}</h4>
                </div>
            ))}
        </div>
    )
}

export default ChangeLogs