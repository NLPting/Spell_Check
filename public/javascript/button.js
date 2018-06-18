//const mes = $("#mes");
const send = $("#send");
API_URL="http://nlp-ultron.cs.nthu.edu.tw:9995/conventional"

$( "#mes" ).on("keyup", function(e){
    //console.log($("#mes").val());
    if(event.keyCode == 13) {
        submitQuery();
    };
  });

function submitQuery(){
   var text = $('#mes').val();
   //console.log(text)
   spell_it_post(text);
}

function find_error(errors){
    
    var strr =''
    for(i=0;i<errors.length;i++){
        //strr += errors[i].candidates.slice(0,3).join(',') + '</br>'
        strr += errors[i].error+'</br>'
        //console.log(strr)
    }
    document.getElementById("err").innerHTML =strr

}
function find_aspell(errors){
    
    var strr =''
    for(i=0;i<errors.length;i++){
        er = errors[i].error
        strr += er+' : '+errors[i].candidates.slice(0,5).join(' , ') + '</br>'
        //console.log(strr)
    }
    document.getElementById("enchant").innerHTML =strr
}

function find_seq2seq(errors){
    var strr =''
    for(i=0;i<errors.length;i++){
        er = errors[i].error
        strr += er+' : '+errors[i].seq2seq.slice(0,5).join(' , ') + '</br>'
        //console.log(strr)
    }
    document.getElementById("rnn").innerHTML =strr
}

function find_w2v(errors){
    var strr =''
    for(i=0;i<errors.length;i++){
        er = errors[i].error
        strr += er+' : '+errors[i].w2v.slice(0,5).join(' , ') + '</br>'
        //console.log(strr)
    }
    document.getElementById("w2v").innerHTML =strr
}

var cccccc = ''

function spell_it_post(query){
    //query = query.replace(/(\r\n|\n)/g, "");
    console.log(query)
    
    $.ajax({
        type: "POST",
        url: API_URL,
        data: JSON.stringify({sentence: query}),
        dataType: 'json',
        success: function (data) {
            console.log(data)
            var content = data.word_diff.replace(/\[-(.*?)-\]/g,
				'<span class="deletion">$1</span>').
				replace(/\{\+(.+?)\+\}/g, '<span class="correction">$1</span>').
				replace(/(\r\n|\n)/g, "<br />");
            
            console.log(content)
            cccccc = cccccc+content+"<br />";

            //console.log(cccccc)
            document.getElementById("show-text").innerHTML =  cccccc  ;
            find_error(data.details)
            find_aspell(data.details)
            find_seq2seq(data.details)
            find_w2v(data.details)
            
        }, 
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            console.log("Status: " + textStatus); 
            console.log("Error: " + errorThrown); 
        } 
    })

    //var content = query.replace(/(\r\n|\n)/g, "<br />");
    //console.log(content)
    //document.getElementById("show-text").innerHTML =  content + '<br />' ;
}



$("#send").click(function(){
    var sentence = $("#mes").val()
    spell_it_post(sentence)
    
})










