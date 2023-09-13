const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

var client = null;

class Msg {
    constructor(topic = "", payload = "") {
      this.timestamp = new Date().toISOString();
      this.topic = topic;
      this.payload = payload;
      }
  }

module.exports = function(RED) {
    function AOAIConfigNode(node) {
        RED.nodes.createNode(this, node);
        this.name = node.name;
        this.deploymentname = node.deploymentname;
        this.modeltype = node.modeltype;
        
    }

    RED.nodes.registerType("AOAI-config", AOAIConfigNode, {
        credentials: {
            apikey: {type: "text"},
            endpoint: {type: "text"},
        }
    });
    
    function AOAIRequestNode(config) {
        
        RED.nodes.createNode(this,config);
        this.promt = config.promt;
        this.systempromt = config.systempromt;
        this.maxTokens = config.maxTokens;     
        const node = this;            
        node.config = config;
        this.AOAIConfig = RED.nodes.getNode(config.AOAIConfig);
             
        if (this.AOAIConfig) {
            console.log("modeltype: " + this.AOAIConfig.modeltype)
            
            node.status({fill: "green", shape: "ring", text: "Ready"});

            client = new OpenAIClient(
                node.AOAIConfig.credentials.endpoint, 
                new AzureKeyCredential(node.AOAIConfig.credentials.apikey)
             
            );
                
            node.on('input', function(msg) {

                systempromt = this.systempromt
                promt = this.promt
                               
                if(msg.payload.promt == undefined ) {promt = this.promt;}
                else {promt = msg.payload.promt}

                if(msg.payload.systempromt == undefined ) {systempromt = this.systempromt;}
                else {systempromt = msg.payload.systempromt}

                console.log("systempromt: " + systempromt)

                node.status({fill: "blue", shape: "ring", text: "Busy"});

                if (this.AOAIConfig.modeltype == "text-davinci-00x"){
                    
                    callAOAI_text_davinci_00x(promt)
                        .then((data) => {
                            console.log(data);
                            msg.payload = data;
                            node.send(msg);
                            node.status({fill: "green", shape: "ring", text: "Ready"});
                        }) 
                        .catch((error) => {
                            console.error(error)
                        })                      
                }
                else if (this.AOAIConfig.modeltype == "gpt-35-turbo"){
                    callAOAI_gpt35turbo(promt)
                        .then((data) => {
                            console.log(data);
                            msg.payload = data;
                            node.send(msg);
                            node.status({fill: "green", shape: "ring", text: "Ready"});
                        }) 
                        .catch((error) => {
                            console.error(error)
                        })                      
                }

                

            });

        } else {
            node.warn('AOAI API: No AOAI config defined');
            node.status({fill: "red", shape: "ring", text: "Invalid config"});
        }

        async function callAOAI_text_davinci_00x(promt)
        {         
            const { id, created, choices, usage } = await client.getCompletions(node.AOAIConfig.deploymentname, [promt], {
                maxTokens: 128
              });
            console.log(choices)

            return choices[0].text
        }

        async function callAOAI_gpt35turbo(promt)
        {         
            const messages = [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: promt },
              ];
            
              //console.log(`Messages: ${messages.map((m) => m.content).join("\n")}`);
            
              const events = client.listChatCompletions(node.AOAIConfig.deploymentname, messages, { maxTokens: 128 });

              answer = "";
              
              for await (const event of events) {
                for (const choice of event.choices) {
                  const delta = choice.delta?.content;
                  if (delta !== undefined) {
                    //console.log(`Chatbot: ${delta}`);
                    answer += delta;
                  }
                }
              }

            return answer
        }


        node.on("close", function() {
        });  
    
    }
    RED.nodes.registerType("AOAI-request",AOAIRequestNode);
}