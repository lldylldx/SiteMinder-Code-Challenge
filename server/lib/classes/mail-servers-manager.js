'use strict';

/**
 * Dependencies
 */

/**
 * Provide mail servers (active server) class
 */

class MailServersManager {
   constructor() {
     this.mailServers = new Map();
     //set default two mail servers
     this.mailServers.set('mailgun', 'active'); // should be set to 'down'
     this.mailServers.set('sendgrid', 'active');
     this.primServDownTime = 0;
     this.primServ = 'sendgrid'; // should be set to 'null'
   }

   addNewServer(servName, servStat) {
     //illegal value checking
     if(servStat != 'active' && servStat != 'down'){
       return false;
     }
     this.mailServers.set(servName, servStat);
     return true;
   }

   removeServer(servName) {
     this.mailServers.delete(servName);
   }

   getPrimServer() {
     return this.primServ;
   }

   setPrimServer(server) {
     this.primServ = server;
   }

   getServerStatus(servName) {
     if(this.hasMailServer(servName) != 'null') {
       return this.mailServers.get(servName);
     }
     return 'null';
   }

   getPrimServDownTime() {
     return this.primServDownTime;
   }

   addPrimServDownTime() {
     this.primServDownTime = this.primServDownTime + 1;
   }

   resetPrimServDownTime() {
     this.primServDownTime = 0;
   }

   setServerActive(servName) {
     this.mailServers.set(servName, 'active');
   }

   setServerDown(servName) {
     this.mailServers.set(servName, 'down');
   }
   //traverse mail server list to find if any server state is active.
   isMailServiceOn() {

     const keys = this.mailServers.keys();
     console.log(this.mailServers.size);
     for(let i = 0; i < this.mailServers.size; i++) {
       let key = keys.next().value;
       if( this.mailServers.get(key) == 'active') {
         return key;
       }
     }
     //if no active mail server then return 'null';
     return 'null';
   }

   hasMailServer(servName) {
     if(this.mailServers.has(servName)) {
       return this.mailServers.get(servName);
     }
     return 'null';
   }


 }

 module.exports = new MailServersManager();
