# APL Document Notes

## links

pt1: <https://build.amazonalexadev.com/get-started-with-the-apl-on-demand-registration-ww.html>

pt2: <https://www.twitch.tv/videos/335838259>

### Components - what it is and how it looks

```json
({
  "type": "Text",
  "text": "hello world",
  "color": "#bada55"
},
{
  "type": "Image",
  "source": "https://coolurl.url",
  "width": "100vw",
  "height": "70vh"
})
```

### Basic Sample

```json
{
  "type": "APL",
  "version": "1.0",
  "mainTemplate": {
    "item": [
      {
        "type": "Frame",
        "backgroundColor": "#bada55",
        "width": "100vw",
        "height": "100vh",
        "item": {
          "type": "Text",
          "text": "Hello World",
          "fontSize": "15vh",
          "color": "#1ce"
        }
      }
    ]
  }
}
```

### Can Also Pass Variables 🔑

-- formatting may not be 100% → this is from the top of my head

```javascript
const dataSources = {
  bgColor: 'teal',
  title: 'Wuz up'
};
...
return responseBuilder
...
.addDirective(
"type": "Alexa.Presentation.APL.RenderDocument",
"version": 1.0,
"document": "mainDoc",
datasources // JSON object
)
...
```

#### in the JSON file

```json
{
...
"mainTemplate": {
"parameters": ["datasource"],
"item": [
{
"type": "Frame",
"backgroundColor": "${datasource.bckColor}",
                "width": "100vw",
                "height": "100vh",
                "item": {
                    "type": "Text",
                    "text": "${datasource.title}",
"fontSize": "15vh",
"color": "#1ce"
...
```

### @viewportProfile

#### Using A When Clause

🐣 think of it as an `if statement`

```json
{
"import": [
{
"name": "alexa-viewport-profiles",
"version": "1.0.0"
}
]
...
{
"when": "${@viewportProfile == @hubRoundSmall}",
   "type": "Container",
   "items":
 },
 {
   "when": "${@viewportProfile == @hubLandScapeMedium}",
"type": "Container",
"items":
}
...
```

### Transformations

❗ part of the datasource NOT part of the APL

#### Sample:

```json
{
"mySkillDataSource": {
  "properties": {
    "hintstring": "how do I make pesto?"
  },
  "transform": [
    {
      "inputPath": "hintString",
      "transformer": "textToHint"
    }
  ]
}
```

### speak list command!! 🔑

#### APL

```json
{
  "type": "Text",
  "id": "syncronizedSpeechComponentId",
  "text": "${payload.mySkillDatasource.properties.synchronizedText}",
  "speech": "${payload.mySkillDatasource.properties.synchronizedTSpeech}",
  // what to change to
  "color": "blue"
}
```

#### Example

```javascript
const myDataSources = {
  "properties": {
    "syncSsml": "<speak>words and stuff</speak>"
  },
  "transform": [
    {
      "inputPath": "syncSsml",
      "outputName": "synchronizedText",
      "transformer": "ssmlToText"
    },
    {
      "inputPath": "syncSsml",
      "outputName": "synchronizedText",
      "transformer": "ssmlToSpeech"
    }
  ]
};

return responseBuilder
  .speak('hello world')
  .addDirective(
    type: 'Alexa.Presentation.APL.RenderDocument',
    token: 'syncronizedTextToken',
    document: require('./main.json'),
    datasources: myDataSources
  )
  .addDirective(
    type: 'Alexa.Presentation.APL.ExecuteCommands',
    token: 'syncronizedTextToken',
    commands: [
      {
        type: 'SpeakItem',
        componentId: 'syhncronizedSpeechComonentId',
        highlighMode: 'line'
      }
    ]
  )
  .getResponse()
```
