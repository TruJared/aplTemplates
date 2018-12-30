// example of passing data to data to output to display //
// you can probably not use a function like this in most cases BUT... //
// ! keeps the code clean :) ! 🛁 //

const getDisplayData = displayParams => {
  const {
    logoUrl,
    background,
    smImgUrl,
    lgImgUrl = smImgUrl,
    title,
    subTitle,
    message,
    hintText
  } = displayParams;
  const datasources = {
    bodyTemplate2Data: {
      type: 'object',
      objectId: 'bt2Sample',
      backgroundImage: {
        contentDescription: null,
        smallSourceUrl: null,
        largeSourceUrl: null,
        sources: [
          {
            url: background,
            size: 'small',
            widthPixels: 0,
            heightPixels: 0
          },
          {
            url: background,
            size: 'large',
            widthPixels: 0,
            heightPixels: 0
          }
        ]
      },
      title: "Let's Read",
      image: {
        contentDescription: null,
        smallSourceUrl: null,
        largeSourceUrl: null,
        sources: [
          {
            url: smImgUrl,
            size: 'small',
            widthPixels: 0,
            heightPixels: 0
          },
          {
            url: lgImgUrl,
            size: 'large',
            widthPixels: 0,
            heightPixels: 0
          }
        ]
      },
      textContent: {
        title: {
          type: 'PlainText',
          text: title
        },
        subtitle: {
          type: 'PlainText',
          text: subTitle
        },
        primaryText: {
          type: 'PlainText',
          text: message
        }
      },
      logoUrl,
      hintText
    }
  };

  return {
    type: 'Alexa.Presentation.APL.RenderDocument',
    version: '1.0',
    document: mainDoc,
    datasources
  };
};
