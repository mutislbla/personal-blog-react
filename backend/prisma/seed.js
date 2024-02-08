const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const detik = await prisma.user.upsert({
    where: { email: "detik@prisma.io" },
    update: {},
    create: {
      email: "detik@prisma.io",
      full_name: "Detik News",
      username: "detik_news",
      password: "passworddetik",
      post: {
        create: {
          title:
            "Tutup Debat Kelima Pilpres, Prabowo Terima Kasih ke Seluruh Presiden RI",
          content:
            "Prabowo berterima kasih karena para pemimpin tersebut karena telah menjaga Indonesia utuh sampai sekarang. Menurut Prabowo, masalah yang dihadapi Indonesia saat ini merupakan kesulitan yang dihadapi rakyat.Prabowo menegaskan komitmennya untuk membawa Indonesia lebih maju. Masalah kemiskinan hingga kematian ibu-ibu disinggung Prabowo dalam pernyataan penutupnya itu.",
          category: "Politics",
          image:
            "https://akcdn.detik.net.id/community/media/visual/2024/02/04/prabowo-subianto-di-panggung-debat-kelima-dok-youtube-kpu_169.png?w=700&q=90",
        },
      },
    },
  });

  const cnbc = await prisma.user.upsert({
    where: { email: "cnbc@prisma.io" },
    update: {},
    create: {
      email: "cnbc@prisma.io",
      full_name: "CNBC Indonesia",
      username: "CNBC.id",
      password: "passwordcnbc",
      post: {
        create: {
          title: "iPhone 15 Pro Jadi iPhone Terburuk, Banjir Keluhan Netizen",
          content:
            "Pengguna iPhone 15 Pro banyak yang tak puas setelah menggunakan HP premium tersebut selama beberapa bulan. Setidaknya begitu hasil survey yang digelar PerfectRec. Platform rekomendasi online tersebut menggelar survey terkait tingkat kepuasan seri iPhone 15 pertama kali pada September lalu. Setelah beberapa bulan, ternyata tingkat kepuasan pengguna iPhone 15 Pro menyusut dari 73,5% menjadi 66%. Selain itu, tingkat kepuasan pengguna iPhone 15 Pro Max juga merosot dari 77% pada September 2023 menjadi 72,4% pada Januari 2024.",
          category: "Technology",
          image:
            "https://akcdn.detik.net.id/visual/2023/09/13/apple-resmi-meluncurkan-iphone-15-reutersloren-elliott-3_169.jpeg?w=715&q=90",
        },
      },
    },
  });
  console.log({ detik, cnbc });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
