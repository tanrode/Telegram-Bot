require('dotenv').config()
var {Client} = require('pg')

var Bot = require('node-telegram-bot-api'),
bot = new Bot(process.env.TOKEN, {polling:true});

console.log('bot server started...');

bot.onText(/^\/start$/,(msg)=>{
	var functions = "/mighty_mighty \n /random_ \n /all_ \n";
		var client = new Client({
			connectionString: process.env.DATABASE_URL,
			ssl:true
		});

		client.connect();

		query = "SELECT COUNT(*), genre FROM bot1schema.FriendshipQuotes GROUP BY GENRE"

		client.query(query, (err, data)=>{
			if(err) throw err;

			console.log(data.rows);

			for(let x in data.rows)
			{
				functions+='/all'+data.rows[x].genre+'\n';
			}

			for(let x in data.rows)
				functions+='/random'+data.rows[x].genre+'\n'


			functions+='/help \n'
			bot.sendMessage(msg.chat.id, functions)

			client.end()
		});
});

bot.onText(/^\/mighty_mighty$/,(msg)=>{
	bot.sendMessage(msg.chat.id,"Yemit")
});

bot.onText(/^\/help$/,(msg)=>{
	bot.sendMessage(msg.chat.id,"Use command /start To view the list of available commands.")
});


var flag = 0;

var evry='';
/*
bot.onText(/^\/all(.+)/,(msg,match)=>{
	var client = new Client({
		connectionString : process.env.DATABASE_URL,
		ssl : true
	});

	client.connect();

	if(match[1]=='_')
	{
		
		query = "SELECT * FROM bot1schema.FriendshipQuotes"

		client.query(query,(err,result)=>{
			if(err) throw err;

			/*for(var i=0;i<result.rows;i++)
			{
				evry=evry+result.rows[i].quote+'\n';
			}
			*/
/*			bot.sendMessage(msg.chat.id, "All Quotes")
		});

		return;
	}
	else
	{
		query = "SELECT genre FROM bot1schema.FriendhsipQuotes GROUP BY genre"
	client.query(query, (err, data)=>{

		if(err) throw err;
/*	
		for(let x in data.rows)
		{
			if(data.rows[x].genre == match[1])
				flag=1;
		}

		if(flag==0)
		{
			bot.sendMessage(msg.chat.id,"NO MATCH")
		}
*/
/*		if(flag==0)
		{
			q2 = "SELECT quote FROM bot1schema.FriendhsipQuotes WHERE genre="+"'"+match[1]+"'"

			client.query(q2, (err,result)=>{
				if(err) throw err;

			for(var i=0;i<result.rows;i++)
			{
				evry=evry+result.rows[i].quote+'\n';
			}

			bot.sendMessage(msg.chat.id, "Hello Random")

			client.end()
			});
		}
	});
	}
});
*/

bot.onText(/^\/random(.+)/,(msg,match)=>{
	var client = new Client({
		connectionString : process.env.DATABASE_URL,
		ssl : true
	});

	client.connect();

	if(match[1]=='_')
	{
		query = "SELECT * FROM bot1schema.FriendshipQuotes"
		client.query(query, (err,result)=>{
				if(err) throw err;

				bot.sendMessage(msg.chat.id,result.rows[Math.floor(Math.random()*result.rows.length)].quote)

		return;

	});
	}
	else{
	query = "SELECT genre FROM bot1schema.FriendshipQuotes GROUP BY genre"
	client.query(query, (err, data)=>{
		if(err) throw err;

		/*for(let x in data.rows)
		{
			//bot.sendMessage(msg.chat.id,data.rows[x].genre)
			if(data.rows[x].genre == match[1])
			{
				flag=1;
				break;
			}
		}

		if(flag==0)
		{
			bot.sendMessage(msg.chat.id,"NO MATCH")
		}
		*/

		if(flag==0)
		{
			q2 = "SELECT quote FROM bot1schema.FriendshipQuotes WHERE genre="+"'"+match[1]+"'"

			client.query(q2, (err,result)=>{
				if(err) throw err;

			bot.sendMessage(msg.chat.id,result.rows[Math.floor(Math.random()*result.rows.length)].quote)
			  //bot.sendMessage(msg.chat.id,'Random Quotes')

			client.end();
			});
		}
	});
}
});


