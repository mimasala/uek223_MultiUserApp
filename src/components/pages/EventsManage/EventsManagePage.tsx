import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { EventRow } from '../../../types/models/EventRow.model'
import EventService from '../../../Services/EventService'
import { EventModel } from '../../../types/models/Event.model'
import { Box, Button } from '@mui/material'

const EventsManagePage = () => {
    const [selectedRowsId, setSelectedRowsId] = useState<string[]>([])
    const [rows, setRows] = useState<EventRow[]>([])
    useEffect(() => {
      createEventRows()
    }, [])
    const createEventRows = () =>{
        EventService.getAllEvents().then(data =>{
            setRows(data.data.map((event:EventModel) =>{
                return {
                    id:event.id,
                    eventName:event.eventName,
                    currentParticipants:event,
                    participantsLimit: event.participantsLimit,
                    startDate:event.startDate,
                    endDate:event.endDate,
                    location:event.location,
                    description:event.description,
                    owner:event.eventOwner?.firstName + " " + event.eventOwner?.lastName,
                }
            }))
          })
    }
    const columns: GridColDef[] = [
        {field:"id", headerName: 'ID', width:70},
        {field:"eventName", headerName:"Event Name", width:130},
        {field:"currentParticipants", headerName:"current participants", width:100},
        {field:"participantsLimit", headerName:"participants limit", width:100},
        {field:"startDate", headerName:"start date time", width:100},
        {field:"endDate", headerName:"end date time", width:100},
        {field:"location", headerName:"location", width:100},
        {field:"description", headerName:"description", width:100},
        {field:"owner", headerName:"owner", width:100},
    ]
    const handleSelectRows = (e:any) =>{
      setSelectedRowsId(e)
    }
    const handleDeleteSelected = (e:any) =>{
      selectedRowsId.forEach((id)=>{
        EventService.deleteEvent(id)
      })
    }
    useEffect(() => {
    }, [selectedRowsId])
    
  return (
    <>
      <Box sx={{margin:"2em"}}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          checkboxSelection
          autoHeight
          onSelectionModelChange={handleSelectRows}
          />
      </Box>
      <Button disabled={selectedRowsId.length === 0} onClick={handleDeleteSelected}>
        delete selected
      </Button>
    </>
  )
}

export default EventsManagePage