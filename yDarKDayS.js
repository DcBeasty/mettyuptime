const { Client, Intents, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const PREFIX = "!"; // komut ön ekini burada belirleyin

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  
  if (interaction.commandName === 'uptime') {
    const url = interaction.options.getString('url');
    
    await interaction.deferReply();
    
    fetch(url)
      .then(res => {
        if (res.ok) {
          const embed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(`${url} çevrimiçi`)
            .setTimestamp();
          interaction.editReply({ embeds: [embed] });
        } else {
          const embed = new MessageEmbed()
            .setColor('RED')
            .setTitle(`${url} çevrimdışı`)
            .setTimestamp();
          interaction.editReply({ embeds: [embed] });
        }
      })
      .catch(err => {
        const embed = new MessageEmbed()
          .setColor('RED')
          .setTitle(`${url} kontrol edilirken bir hata oluştu`)
          .setDescription(err.message)
          .setTimestamp();
        interaction.editReply({ embeds: [embed] });
      });
  }
});

client.on('messageCreate', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;
  
  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  
  if (command === 'invite') {
    const embed = new MessageEmbed()
      .setTitle('Botu Sunucunuza Davet Edin')
      .setDescription('[Davet Linki](https://discord.com/oauth2/authorize?client_id=1094486778708246578&scope=applications.commands%20bot&permissions=19456)')
      .setThumbnail(client.user.displayAvatarURL())
      .setColor('GREEN')
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
  }
});

client.login('your-token-goes-here');
