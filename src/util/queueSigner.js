import { Connection, Exchange, Queue } from 'react-native-rabbitmq';

export const rabbitConfig = {
    host:'ec2-3-89-88-24.compute-1.amazonaws.com',
    port:5672,
    username:'dist',
    password:'dist',
    virtualhost:'vhost',
    ttl: 10000, // Message time to live
    ssl: true // Enable ssl connection, make sure the port is 5671 or an other ssl port
}