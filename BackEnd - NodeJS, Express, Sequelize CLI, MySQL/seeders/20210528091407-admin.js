'use strict';

require('dotenv').config();                         // importation du package "dotenv"

// Premier fichier dans la base de données: l'administrat.eur.rice

const md5 = require('md5');
const bcrypt = require('bcrypt');

const Registration = process.env.ADMINREGISTRATION;
const hashedRegistration = `${Registration.charAt(0)}${md5(Registration.substring(1))}`;
const ResetKey = process.env.ADMINKEY;
const hashedResetKey = `${ResetKey.charAt(0)}${md5(ResetKey.substring(1))}`;
const hashedPassword = bcrypt.hashSync(process.env.ADMINPASSWORD, 10);

const admin = {
  pseudonym: "Administrator",
  registration: hashedRegistration,
  password: hashedPassword,
  oldPassword: hashedPassword,
  resetKey: hashedResetKey,
  avatar: "avatar_base/groupomania_admin.png",
  isAdmin: true,
  isModerator: false,
  createdAt: new Date(),
  updatedAt: new Date()
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [admin]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
