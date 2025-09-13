const resetBtn = document.getElementById("tombolreset");
const form = document.getElementById('form');

form.addEventListener('submit', function(e) {
  const tinggi = document.getElementById('tinggi').value;
  const panjang = document.getElementById('panjang').value;
  const lebar = document.getElementById('lebar').value;
  const container2 = document.getElementById("container2");
  container2.style.display = "block";
    e.preventDefault();
    if (Number(lebar) > Number(panjang)) {
    alert("Lebar tidak boleh lebih besar dari tinggi!");
    return; 
  }
  else{
     ratio(panjang,tinggi,lebar)
      volume(panjang, lebar, tinggi)
      luasPermukaan(panjang, lebar, tinggi)
      beratAir(panjang, lebar, tinggi)
    }
    
    });

tombolreset.addEventListener("click", function() {
  form.reset(); 
  container2.style.display = "none"; 
  document.getElementById("kacaSamping").innerHTML = "";
  document.getElementById("kacaBawah").innerHTML = "";
});

function ratio(panjang, tinggi, lebar){
let ratioLH = 0;
let ratioLW = 0;
ratioLH = panjang/tinggi;
ratioLW = panjang/lebar;
alphabetaKacaSamping(ratioLH, tinggi)
alphabetaKacaBawah(ratioLW, tinggi)
}

function interpolate(x, x1, y1, x2, y2) {
  return y1 + (y2 - y1) * ( (x - x1) / (x2 - x1) );
}

function alphabetaKacaSamping(ratio, tinggi){

const data = [
  {ratio: 0.5, alpha: 0.003,  beta: 0.085},
  {ratio: 0.666, alpha: 0.0085, beta: 0.1156},
  {ratio: 1.0, alpha: 0.022,  beta: 0.16},
  {ratio: 1.5, alpha: 0.042,  beta: 0.26},
  {ratio: 2.0, alpha: 0.056,  beta: 0.32},
  {ratio: 2.5, alpha: 0.063,  beta: 0.35},
  {ratio: 3.0, alpha: 0.067,  beta: 0.37}
];

let alpha = 0;
let beta = 0;
if (ratio <= 0.5) {
    // Kalau lebih kecil dari 0.5, pakai nilai ratio = 0.5
    alpha = data[0].alpha;
    beta = data[0].beta;
  } else if (ratio >= 3.0) {
    // Kalau lebih besar dari 3, pakai nilai ratio = 3
    alpha = data[data.length - 1].alpha;
    beta = data[data.length - 1].beta;
  } else {
    // Kalau di antara itu, pakai interpolasi linear
    for (let i = 0; i < data.length - 1; i++) {
      let d1 = data[i];
      let d2 = data[i+1];
      if (ratio >= d1.ratio && ratio <= d2.ratio) {
        alpha = interpolate(ratio, d1.ratio, d1.alpha, d2.ratio, d2.alpha);
        beta  = interpolate(ratio, d1.ratio, d1.beta,  d2.ratio, d2.beta);
        break;
      }
    }
  }
  kacaSamping(alpha,beta, tinggi)
}

function alphabetaKacaBawah(ratio, tinggi){
    const data = [
  {ratio: 1.0, alpha: 0.077,  beta: 0.453},
  {ratio: 1.5, alpha: 0.0906,  beta: 0.5172},
  {ratio: 2.0, alpha: 0.1017,  beta: 0.5688},
  {ratio: 2.5, alpha: 0.111,  beta: 0.6102},
  {ratio: 3.0, alpha: 0.1335,  beta: 0.7134}
];

let alpha = 0;
let beta = 0;

 if (ratio >= 3.0) {
    // Kalau lebih besar dari 3, pakai nilai ratio = 3
    alpha = data[data.length - 1].alpha;
    beta = data[data.length - 1].beta;
  } else {
    // Kalau di antara, pakai interpolasi linear
    for (let i = 0; i < data.length - 1; i++) {
      let d1 = data[i];
      let d2 = data[i+1];
      if (ratio >= d1.ratio && ratio <= d2.ratio) {
        alpha = interpolate(ratio, d1.ratio, d1.alpha, d2.ratio, d2.alpha);
        beta  = interpolate(ratio, d1.ratio, d1.beta,  d2.ratio, d2.beta);
        break;
      }
    }
  }
  kacaBawah(alpha,beta, tinggi)
}

function TekananAir(tinggi){
  return tinggi * 10;
}

function kacaSamping(alpha,beta, tinggi){
  //ubah ke mm
    tinggi = tinggi * 10
    let FrontThickness = 0;
    let Tekanan = 0;
    Tekanan = TekananAir(tinggi)

    FrontThickness = Math.sqrt((beta * tinggi * tinggi * tinggi * 0.00001 / 5.05))
    document.getElementById("kacaSamping").innerHTML="hasil ketebalan kaca samping : " + FrontThickness.toFixed(1);

    let defleksiKacaSamping = (alpha * Tekanan * 0.000001 * (tinggi**4)) / (69000 * FrontThickness**3);
    document.getElementById("defleksiKacaSamping").innerHTML="hasil defleksi kaca samping : " + defleksiKacaSamping.toFixed(1);
}

function kacaBawah(alpha,beta, tinggi){
  //ubah ke mm
    tinggi = tinggi * 10
    let BottomThickness = 0;
    let Tekanan = 0;
    Tekanan = TekananAir(tinggi)

    BottomThickness = Math.sqrt((beta * tinggi * tinggi * tinggi * 0.00001 / 5.05))
    document.getElementById("kacaBawah").innerHTML="Hasil ketebalan kaca bawah : " + BottomThickness.toFixed(1);

     document.getElementById("kacaBawah").innerHTML="hasil ketebalan kaca bawah : " + BottomThickness.toFixed(1);

    let defleksiKacaBawah = (alpha * Tekanan * 0.000001 * (tinggi**4))/(69000*BottomThickness**3)
    document.getElementById("defleksiKacaBawah").innerHTML="hasil defleksi kaca bawah : " + defleksiKacaBawah.toFixed(1);
}


function volume(panjang, lebar, tinggi){
    let volume = 0;
    volume = (panjang * lebar * tinggi) / 1000;
    document.getElementById("volume").innerHTML ="Volume aquarium : " + volume.toFixed(1) + " liter";
}

function luasPermukaan(panjang, lebar, tinggi){
    let luas = 0;
    luas = 2 * (panjang * lebar) * tinggi + lebar * tinggi;
    document.getElementById("luas").innerHTML ="Luas permukaan kaca : " + luas.toFixed(1) + " cm2";
}

function beratAir(panjang, lebar, tinggi, massaJenisAir = 998) {
  let volumeLiter = (panjang * lebar * tinggi) / 1000;
  let berat = (volumeLiter * massaJenisAir) / 1000; 
  document.getElementById("beratAir").innerHTML ="Berat air : " + berat.toFixed(1) + " kg";
}



   


