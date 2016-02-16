# meteor-seneca

Example of a meteor app combined with a seneca server, based on the presentation of [Presentation of Tobias Jaeckel](https://www.youtube.com/watch?v=9FDWv0BDKtI).



# Installation 

## Seneca server dependencies

```
cd seneca && npm install
```





# Start the Meteor app and the Seneca server

## Start the app in a terminal window
```
cd meteor && DEBUG=*seneca* meteor
```


## Start the seneca server in _another_ terminal window:
```
cd seneca && DEBUG=*seneca* node server.js
```



# Resources

- [Meteor](https://www.meteor.com)
- [Seneca, a microservices toolkit for Node.js](http://senecajs.org)
- [seneca-mongo-store](https://github.com/rjrodger/seneca-mongo-store)
- [socket.io](http://socket.io)

