const pdf = require('html-pdf');



function generarPdf_inform1(lista,query,namefile,res){
    
    let html=`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .titulo{ color:blue}
        body{
            padding:80px;
        }
        
table {
    background: #f5f5f5;
    border-collapse: separate;
    box-shadow: inset 0 1px 0 #fff;
    font-size: 12px;
    line-height: 24px;
    margin: 30px auto;
    text-align: left;
    width: 100%;
  } 
  
  th {
    background: url(https://jackrugile.com/images/misc/noise-diagonal.png), linear-gradient(#777, #444);
    border-left: 1px solid #555;
    border-right: 1px solid #777;
    border-top: 1px solid #555;
    border-bottom: 1px solid #333;
    box-shadow: inset 0 1px 0 #999;
    color: #fff;
    font-weight: bold;
    padding: 10px 15px;
    position: relative;
    text-shadow: 0 1px 0 #000;  
  }
  
  th:after {
    background: linear-gradient(rgba(255,255,255,0), rgba(255,255,255,.08));
    content: '';
    display: block;
    height: 25%;
    left: 0;
    margin: 1px 0 0 0;
    position: absolute;
    top: 25%;
    width: 100%;
  }
  
  th:first-child {
    border-left: 1px solid #777;  
    box-shadow: inset 1px 1px 0 #999;
  }
  
  th:last-child {
    box-shadow: inset -1px 1px 0 #999;
  }
  
  td {
    border-right: 1px solid #fff;
    border-left: 1px solid #e8e8e8;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #e8e8e8;
    padding: 10px 15px;
    position: relative;
    transition: all 300ms;
  }
  
  td:first-child {
    box-shadow: inset 1px 0 0 #fff;
  } 
  
  td:last-child {
    border-right: 1px solid #e8e8e8;
    box-shadow: inset -1px 0 0 #fff;
  } 
  
  tr {
    background-color: gris; 
  }
  
  tr:nth-child(odd) td {
    background: #f1f1f1 url(https://jackrugile.com/images/misc/noise-diagonal.png); 
  }
  
  tr:last-of-type td {
    box-shadow: inset 0 -1px 0 #fff; 
  }
  
  tr:last-of-type td:first-child {
    box-shadow: inset 1px -1px 0 #fff;
  } 
  
  tr:last-of-type td:last-child {
    box-shadow: inset -1px -1px 0 #fff;
  } 
  
  tbody:hover td {
    color: transparent;
    text-shadow: 0 0 3px #aaa;
  }
  
  tbody:hover tr:hover td {
    color: #444;
    text-shadow: 0 1px 0 #fff;
  }
  
  </style>
</head>
<body>
    <h1 class="titulo"> Informe de clientes</h1>
    <h6>Filtrado mediante el criterio de nombre/nit/ci:<strong>`+query+`</strong> </h6>
    <table >
        <tr>
            <td>Clientes</td>
            <td>Nit/CI</td>
        <tr>`;
        for(i=0;i<lista.length;i++){
            html+=`<tr>
                <td>`+lista[i].cliente+`</td>
                <td>`+lista[i].nit+`</td>
            <tr>`;
        }
        html+=`</table>
        
        </body>
</html>
        `;    
    pdf.create(html).toFile('./'+namefile,function(err, doc){
        //stream.pipe(fs.createWriteStream('./foo.pdf'));
        if(err)
            console.log("error",erro);
        else{
            console.log("biuen",doc);
            res.download(doc.filename);
        }
      });
}

function perfil(p,doc,res){
  let html=`
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
          .titulo{ color:blue}
          body{
              padding:80px;
          }
          
  table {
      background: #f5f5f5;
      border-collapse: separate;
      box-shadow: inset 0 1px 0 #fff;
      font-size: 12px;
      line-height: 24px;
      margin: 30px auto;
      text-align: left;
      width: 100%;
    } 
    
    th {
      background: url(https://jackrugile.com/images/misc/noise-diagonal.png), linear-gradient(#777, #444);
      border-left: 1px solid #555;
      border-right: 1px solid #777;
      border-top: 1px solid #555;
      border-bottom: 1px solid #333;
      box-shadow: inset 0 1px 0 #999;
      color: #fff;
      font-weight: bold;
      padding: 10px 15px;
      position: relative;
      text-shadow: 0 1px 0 #000;  
    }
    
    th:after {
      background: linear-gradient(rgba(255,255,255,0), rgba(255,255,255,.08));
      content: '';
      display: block;
      height: 25%;
      left: 0;
      margin: 1px 0 0 0;
      position: absolute;
      top: 25%;
      width: 100%;
    }
    
    th:first-child {
      border-left: 1px solid #777;  
      box-shadow: inset 1px 1px 0 #999;
    }
    
    th:last-child {
      box-shadow: inset -1px 1px 0 #999;
    }
    
    td {
      border-right: 1px solid #fff;
      border-left: 1px solid #e8e8e8;
      border-top: 1px solid #fff;
      border-bottom: 1px solid #e8e8e8;
      padding: 10px 15px;
      position: relative;
      transition: all 300ms;
    }
    
    td:first-child {
      box-shadow: inset 1px 0 0 #fff;
    } 
    
    td:last-child {
      border-right: 1px solid #e8e8e8;
      box-shadow: inset -1px 0 0 #fff;
    } 
    
    tr {
      background-color: gris; 
    }
    
    tr:nth-child(odd) td {
      background: #f1f1f1 url(https://jackrugile.com/images/misc/noise-diagonal.png); 
    }
    
    tr:last-of-type td {
      box-shadow: inset 0 -1px 0 #fff; 
    }
    
    tr:last-of-type td:first-child {
      box-shadow: inset 1px -1px 0 #fff;
    } 
    
    tr:last-of-type td:last-child {
      box-shadow: inset -1px -1px 0 #fff;
    } 
    
    tbody:hover td {
      color: transparent;
      text-shadow: 0 0 3px #aaa;
    }
    
    tbody:hover tr:hover td {
      color: #444;
      text-shadow: 0 1px 0 #fff;
    }
    
    </style>
  </head>
  <body>
      <h1 class="titulo"> Perfil de personal</h1>
      <h6><strong>`+p.Nombre+" "+p.Apellido_pat+`</strong> </h6>
      <br>
      <h7> <strong>c:</strong>`+p.Ci +`</h7>
      <table > </table>
          
          
          </body>
  </html>
          `;    
  pdf.create(html).toFile('./'+doc,function(err, pdf){
    //stream.pipe(fs.createWriteStream('./foo.pdf'));
    if(err)
        console.log("error",erro);
    else{
        console.log("biuen",pdf);
        res.download(pdf.filename);
    }
  });
}
module.exports={
  informe1:generarPdf_inform1,
  perfil:perfil
};