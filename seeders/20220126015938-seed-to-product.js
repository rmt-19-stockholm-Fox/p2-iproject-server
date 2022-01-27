"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Products", [
      {
        name: "Iron 1200",
        description: "description of iron 1200",
        image1:
          "https://imgcdnblog.carbay.com/wp-content/uploads/2019/05/02071551/harley-iron-1200-sportster-1.jpg",
        image2:
          "https://imgx.gridoto.com/crop/0x0:0x0/750x500/photo/2019/05/23/3067943827.jpg",
        image3: "https://i.ytimg.com/vi/r_ZX_6zF_z0/maxresdefault.jpg",
        price: 400000000,
        quantity: 5,
        summary: "summary of iron 1200",
        UsersId: 1,
        CategoriesId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Iron 883 ",
        description: "description of iron 883",
        image1:
          "https://imgcdn.oto.com/medium/gallery/exterior/72/1925/harley-davidson-iron-883-13789.jpg",
        image2:
          "https://media.zigcdn.com/media/model/2018/Oct/right-side-view-671325840_600x400.jpg",
        image3:
          "https://images.tokopedia.net/img/cache/500-square/hDjmkQ/2021/9/21/e399f417-1476-4d76-9b54-b6da0d1345fc.jpg",
        price: 500000000,
        quantity: 4,
        summary: "summary of iron 883",
        UsersId: 1,
        CategoriesId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Fourty Eight",
        description: "description of Fourty Eight",
        image1:
          "https://imgcdn.oto.com/medium/gallery/exterior/72/1933/harley-davidson-forty-eight-left-side-view-full-image-324856.jpg",
        image2:
          "https://pbs.twimg.com/media/ElHq-aWW0AI_YsU.pnghttps://imgx.gridoto.com/crop/0x0:0x0/750x500/photo/2019/05/23/3067943827.jpg",
        image3:
          "https://www.thunderbike.com/wp-content/uploads/2020/04/Steffi-Dahlke-Thunderbike-23.-April-2020-%C2%A9-Ben-Ott-32-545x364.jpg",
        price: 600000000,
        quantity: 3,
        summary: "summary of Fourty Eight",
        UsersId: 1,
        CategoriesId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Products", null);
  },
};
