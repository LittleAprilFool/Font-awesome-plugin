function initialize()
{
    initColors();
    dynamic_icon();

    // Register callback for PS events
    csInterface.addEventListener("PhotoshopCallback", PhotoshopCallback);

    // Send an event to register for events
    var event = new CSEvent("com.adobe.PhotoshopRegisterEvent", "APPLICATION");
    event.extensionId = csInterface.getExtensionID();
    event.data = PSEventIDs.join(", ");
    csInterface.dispatchEvent(event);
}


function tohex(c) { return Math.round(c).toString(16); }

function colorToHex( uicolor )
{
    var result = "#";
    result = result + tohex( uicolor.color.red ) + tohex( uicolor.color.green ) + tohex( uicolor.color.blue );
    if (uicolor.color.alpha < 255)
        result += tohex( uicolor.color.alpha );
    return result.toUpperCase();
}

function initColors()
{
    var csInterface = new CSInterface();
    csInterface.hostEnvironment = JSON.parse(window.__adobe_cep__.getHostEnvironment());
    window.document.bgColor = colorToHex( csInterface.hostEnvironment.appSkinInfo.panelBackgroundColor );
}

function PhotoshopCallback(csEvent)
{
    if (csEvent.extensionId === csInterface.getExtensionID())
    {
      //todo
    }
}

function str_pad( hex ){
   var zero = '000';
   var tmp  = 3-hex.length;
   return zero.substr(0,tmp) + hex;
}

function dynamic_icon()
{
    for(i = 0; i < 571; i++)
    {
      var x = "f"+str_pad(tohex(i));
      $(".icon-list").append("<button class='icon' id='icon-"+x+"'><i class='fa fa-fw'>&#x"+x+"</i></button>");
    }
}

initialize();
