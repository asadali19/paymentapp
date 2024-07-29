require('dotenv').config();
const express = require('express')
const mysql = require('mysql')
const cors = require('cors');
const database = require('./config/db')
const merchantRoutes = require('./routes/merchantRoutes'); 
const userRoutes = require('./routes/userRoutes');
const terminalRoutes = require('./routes/terminalRoutes');
const chargeRoutes = require('./routes/chargesRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const roleRoutes = require('./routes/roleRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const groupRoutes = require('./routes/groupRoutes')
const subgroupRoutes = require('./routes/subgroupRoutes')
const channelRoutes = require('./routes/channelRoutes')
const regionRoutes = require('./routes/regionRoutes')
const cityRoutes = require('./routes/citiesRoutes')
const industryRoutes = require('./routes/industryRoutes')
const atmRoutes = require('./routes/atmRoutes')
const mopRoutes = require('./routes/mopRoutes')
const introducerRoutes = require('./routes/introducerRoutes')
const app =express()
app.use(cors());
app.use(express.json());


app.use('/api', merchantRoutes);
app.use('/api', userRoutes);
app.use('/api', terminalRoutes);
app.use('/api', chargeRoutes);
app.use('/api', transactionRoutes);
app.use('/api', roleRoutes);
app.use('/api', permissionRoutes);
app.use('/api', groupRoutes);
app.use('/api', subgroupRoutes);
app.use('/api', channelRoutes);
app.use('/api', regionRoutes);
app.use('/api', cityRoutes);
app.use('/api', industryRoutes);
app.use('/api', atmRoutes);
app.use('/api', mopRoutes);
app.use('/api', introducerRoutes);




PORT = process.env.PORT
app.listen(PORT, function(){
    console.log(`Server is connected ${PORT}`);
})