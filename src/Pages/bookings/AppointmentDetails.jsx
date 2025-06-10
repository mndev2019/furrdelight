// import React from 'react'
import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Grid,
    Box,
} from '@mui/material';
import PropTypes from 'prop-types';

const AppointmentDetails = ({ data }) => {
    return (
        <>
            <Box p={2}>
                <Card sx={{ maxWidth: 800, margin: '0 auto', borderRadius: 3, boxShadow: 4 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Appointment Details
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6">Doctor</Typography>
                                <Avatar
                                    src={`/${data.doctor.profile_image}`}
                                    alt={data.doctor.name}
                                    sx={{ width: 56, height: 56, my: 1 }}
                                />
                                <Typography>Name: {data.doctor.name}</Typography>
                                <Typography>Mobile: {data.doctor.mobile}</Typography>
                                <Typography>Gender: {data.doctor.gender}</Typography>
                                <Typography>DOB: {data.doctor.dob}</Typography>
                                <Typography>Address: {data.doctor.address}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6">User</Typography>
                                <Typography>Name: {data.user.name}</Typography>
                                <Typography>Mobile: {data.user.mobile}</Typography>
                                <Typography>Gender: {data.user.gender}</Typography>
                                <Typography>DOB: {data.user.dob}</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h6">Booking Info</Typography>
                                <Typography>Booking Date: {new Date(data.booking_date).toLocaleString()}</Typography>
                                <Typography>Duration: {data.duration} minutes</Typography>
                                <Typography>Slot: {data.slots[0].start_time} - {data.slots[0].end_time}</Typography>
                                <Typography>Status: {data.status}</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

export default AppointmentDetails

AppointmentDetails.propTypes = {
    data: PropTypes.object
}
