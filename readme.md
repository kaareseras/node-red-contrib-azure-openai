# Node-RED Azure OpenAI Node

This Node-RED node allows you to interact with Azure OpenAI to generate completions based on provided prompts and system prompts. It sends a prompt to the Azure OpenAI service and forwards the completions to the flow. This README provides instructions on how to install, configure, and use this node in your Node-RED project.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Node Properties](#node-properties)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

Before using this node, ensure you have Node-RED installed. If you haven't already, you can download and install Node-RED by following the instructions on the [official website](https://nodered.org/docs/getting-started/installation).

To install this node in your Node-RED environment, you can use the following methods:

### Option 1: Node-RED Palette Manager

1. Open your Node-RED dashboard.
2. Click the menu icon in the top-right corner.
3. Select "Manage palette."
4. Go to the "Install" tab.
5. Search for "node-red-contrib-azure-openai" and click "Install."

### Option 2: Command Line

You can also install this node using the Node-RED command-line tool:

```bash
npm install node-red-contrib-azure-openai
```

After installation, restart Node-RED to make the node available in your palette.

---

## Configuration

Before you can use the Azure OpenAI node, you need to configure it with your Azure OpenAI service credentials. Follow these steps to set up the configuration:

1. Drag and drop the "Azure OpenAI" node onto your Node-RED flow.

2. Double-click the node to open its configuration dialog.

3. Click the "Edit" button next to the "Azure OpenAI Config" field to configure your Azure OpenAI service credentials. You will need the following information:
   
   - **Endpoint**: The URL endpoint of your Azure OpenAI service.
   - **API Key**: Your Azure OpenAI API key.
   
   - **Model**: Select the model you want to use for generating completions. You can choose from:
     - GPT-3.5-Turbo
     - Text-DaVinci-003


4. Once you've entered your credentials and selected a model, click the "Add" button to save them. 

5. Click "Done" to close the configuration dialog.

---

## Usage

Now that you have configured the Azure OpenAI node, you can use it in your Node-RED flows to generate completions based on prompts and system prompts. Here's how to use the node:

1. Add the "Azure OpenAI" node to your flow as mentioned in the Configuration section.

2. Connect the input of the "Azure OpenAI" node to a source of data that provides the prompts and system prompts. You can use other nodes or inject messages into this input.

3. Configure the "Azure OpenAI" node by setting the following properties in the configuration dialog:

   - **Prompt**: A static prompt that will be used unless overridden by the incoming `msg.payload.prompt`.

   - **System Prompt**: A static system prompt that will be used unless overridden by the incoming `msg.payload.systemprompt`.

4. Deploy your flow.

5. When a message containing `msg.payload.prompt` and/or `msg.payload.systemprompt` is sent to the "Azure OpenAI" node, it will generate completions and forward them in the output message.

6. Use the output of the "Azure OpenAI" node in your flow as needed, or pass it to other nodes for further processing.

7. Ensure that you handle the responses from Azure OpenAI appropriately based on your use case.

---

## Node Properties

The "Azure OpenAI" node has the following properties that you can configure:

- **Name**: The name of the node (optional).
- **Azure OpenAI Config**: The configuration for your Azure OpenAI service, including the endpoint, API key, and selected model.
- **Prompt**: A static prompt that will be used unless overridden by `msg.payload.prompt`.
- **System Prompt**: A static system prompt that will be used unless overridden by `msg.payload.systemprompt`.

---

## Contributing

Contributions to this project are welcome! If you encounter any issues, have suggestions for improvements, or would like to contribute code, please visit the [GitHub repository](https://github.com/your-username/your-repository) for this project and open an issue or pull request.

---

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify this code as needed in your projects.