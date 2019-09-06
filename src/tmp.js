/**
|--------------------------------------------------
| Getting data from a source
|--------------------------------------------------
*/
// var tmp = document.getElementsByClassName('list_pic_switch_2')
// var arr = []
// for(var i = 0; i < tmp.length; i++) {
//   arr.push({uri: tmp[i].src})
// }
// // copy(arr)


const data = [
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/10/16/goods-img/1540026640141006901.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/10/18/goods-img/1543804024984384317.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/11/20/goods-img/1543026604484526234.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/11/15/goods-img/1544037714841259668.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/11/01/goods-img/1541010583224926246.png" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/11/30/goods-img/1545961598544115696.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/10/19/goods-img/1544554954223296276.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/11/29/goods-img/1545962056510730383.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/11/21/goods-img/1543864572688293067.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/09/20/goods-img/1541723872244087855.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/10/26/goods-img/1541805961454525132.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/11/29/goods-img/1544653203009448545.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/11/08/goods-img/1542065159044292487.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/12/07/goods-img/1544221047312145261.png" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/12/13/goods-img/1544991870149393420.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/11/27/goods-img/1547406023816854772.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/10/24/goods-img/1540411436449763634.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/12/03/goods-img/1544988949744153676.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/11/27/goods-img/1544210169650247400.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/11/27/goods-img/1546640164396814114.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/09/17/goods-img/1538262898827495778.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/04/16/goods-img/1546052052374007688.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/05/28/goods-img/1528762336029462841.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/01/23/goods-img/1546453049297959054.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/05/21/goods-img/1528391522239172866.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/05/18/goods-img/1527199770310641790.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/12/12/goods-img/1544566593195497120.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/03/30/goods-img/1544029011021949135.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2017/12/22/goods-img/1546051400248973448.png" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/10/09/goods-img/1539059911204731235.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2017/04/20/goods-img/1546455890979538049.png" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/09/25/goods-img/1540765030286836909.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/11/14/goods-img/1544399713322819727.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/11/12/goods-img/1545240941851334761.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/05/05/goods-img/1525918742999594858.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/10/24/goods-img/1541456008387902062.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2017/09/12/goods-img/1515622521888435095.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2017/10/12/goods-img/1542234999659196185.JPG" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/01/12/goods-img/1517858952420029681.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2017/04/07/goods-img/1522112421402869828.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/10/11/goods-img/1539738921344283762.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/04/03/goods-img/1525802354938421469.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/11/21/goods-img/1542763475008349172.png" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/09/01/goods-img/1535958656492758496.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/10/31/goods-img/1541379786676961455.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/10/15/goods-img/1540941946386050257.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/09/14/goods-img/1538186665292926347.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2017/09/14/goods-img/1512949414227907560.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/09/29/goods-img/1542074671898891932.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2017/11/21/goods-img/1514337008254779117.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2017/12/29/goods-img/1546455622781900875.png" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/09/26/goods-img/1542066164769861643.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/11/08/goods-img/1541715899526344496.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/06/15/goods-img/1529351167851606734.png" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/05/07/goods-img/1527725112148863156.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/11/21/goods-img/1542828802116135184.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/09/13/goods-img/1536887540784432664.jpg" },
  { uri: "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2018/11/01/goods-img/1542874330914954522.jpg" }
]

/**
|--------------------------------------------------
| Populating Database
|--------------------------------------------------
**/
// var arr = [], obj
// for (let i=0; i< data.length; i++) {
//   obj = {
//     name: "Product "+i,
//     Price: 100000,
//     Category: 1,
//     Stock: [{color: 'red', size: 'M', count: 10}, {color: 'black', size: 'XXL', count: 20}],
//     shop: "12345",
//     short_desc: "Short description",
//     longDescription: "Long description",
//     discount: 10000,
//     hot: i%2===0,
//     images: [data[i].uri],
//     date_added: 131243123,
//     approved: 1,
//   }
//   arr = [...arr, obj]
// }

// console.log(arr)

export default data