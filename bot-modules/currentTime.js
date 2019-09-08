const today = new Date();
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const dateTime = date+' '+time;

module.exports = dateTime;


//log format:
// server message: [timestamp][servername][channelname] member.displayname (sent/deleted) sdfajhkdf
// system message: [timestamp][Bot] adsfasdfj
// DM            : [timestamp][DM] user.username (sent/deleted) dfasdgsd
