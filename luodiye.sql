/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : luodiye

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-09-15 17:14:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for ld_admin
-- ----------------------------
DROP TABLE IF EXISTS `ld_admin`;
CREATE TABLE `ld_admin` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '后台管理员id',
  `username` varchar(32) NOT NULL COMMENT '管理员账号',
  `password` varchar(32) NOT NULL COMMENT '管理员密码',
  `identity` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '管理员身份 1-普通管理员 2-超级管理员 ',
  `login_ip` varchar(16) DEFAULT NULL COMMENT '最近一次登录ip',
  `create_time` int(16) DEFAULT NULL COMMENT '账号创建时间',
  `update_time` int(16) DEFAULT NULL COMMENT '账号更新时间',
  `deleted_time` int(16) DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`,`username`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='后台管理表';

-- ----------------------------
-- Records of ld_admin
-- ----------------------------
INSERT INTO `ld_admin` VALUES ('1', 'admin', 'cb16979fd5ba7497bbcec4b1157aad11', '1', '127.0.0.1', null, null, null);

-- ----------------------------
-- Table structure for ld_data
-- ----------------------------
DROP TABLE IF EXISTS `ld_data`;
CREATE TABLE `ld_data` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '数据id',
  `aid` int(8) DEFAULT NULL COMMENT '上传者id',
  `wx_number` varchar(32) DEFAULT NULL COMMENT '微信号',
  `wx_code` varchar(255) DEFAULT NULL COMMENT '微信二维码',
  `create_time` int(16) DEFAULT NULL COMMENT '创建时间',
  `update_time` int(16) DEFAULT NULL COMMENT '更新时间',
  `deleted_time` int(16) DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COMMENT='数据库，存放微信号和二维码';

-- ----------------------------
-- Records of ld_data
-- ----------------------------
INSERT INTO `ld_data` VALUES ('1', '1', '123123213', '/uploads/code/20180915\\ed9d4cf6c44e1b57229ed1351a2f7186.jpg', null, '1536998370', null);
INSERT INTO `ld_data` VALUES ('2', '1', 'qwewqe', '/uploads/code/20180915\\a64968abbf0cca1d47205c61f3d3dd59.jpg', null, '1536998361', null);
INSERT INTO `ld_data` VALUES ('6', '1', '123213', '/uploads/code/20180915\\ed9d4cf6c44e1b57229ed1351a2f7186.jpg', null, '1536997277', '1536997277');
INSERT INTO `ld_data` VALUES ('5', '1', 'wx1111111111', '/uploads/code/20180915\\ed9d4cf6c44e1b57229ed1351a2f7186.jpg', null, '1536995543', null);
INSERT INTO `ld_data` VALUES ('7', null, '123123', '/uploads/code/20180915\\ed9d4cf6c44e1b57229ed1351a2f7186.jpg', null, '1536996759', '1536996759');
INSERT INTO `ld_data` VALUES ('8', '1', '123123', '/uploads/code/20180915\\ed9d4cf6c44e1b57229ed1351a2f7186.jpg', null, null, null);
INSERT INTO `ld_data` VALUES ('9', '1', 'wx123', '/uploads/code/20180915\\ed9d4cf6c44e1b57229ed1351a2f7186.jpg', null, '1536995997', null);
INSERT INTO `ld_data` VALUES ('10', '1', '5848545', '/uploads/code/20180915\\ed9d4cf6c44e1b57229ed1351a2f7186.jpg', null, '1536997277', '1536997277');
INSERT INTO `ld_data` VALUES ('11', '1', '1111', '/uploads/code/20180915\\ed9d4cf6c44e1b57229ed1351a2f7186.jpg', null, '1536997269', '1536997269');
INSERT INTO `ld_data` VALUES ('12', '1', '123123', '/uploads/code/20180915\\ed9d4cf6c44e1b57229ed1351a2f7186.jpg', null, null, null);
INSERT INTO `ld_data` VALUES ('13', '1', '1231231', '/uploads/code/20180915\\ed9d4cf6c44e1b57229ed1351a2f7186.jpg', null, null, null);
INSERT INTO `ld_data` VALUES ('14', '1', '1231231123', '/uploads/code/20180915\\ed9d4cf6c44e1b57229ed1351a2f7186.jpg', null, '1536997277', '1536997277');
INSERT INTO `ld_data` VALUES ('15', '1', 'asadasda', '/uploads/code/20180915\\ed9d4cf6c44e1b57229ed1351a2f7186.jpg', null, '1536995914', '1536995914');
INSERT INTO `ld_data` VALUES ('16', '1', '1dasd', '/uploads/code/20180915\\ed9d4cf6c44e1b57229ed1351a2f7186.jpg', '1536993836', '1536993836', null);
INSERT INTO `ld_data` VALUES ('17', '1', '213123', '/uploads/code/20180915\\ed9d4cf6c44e1b57229ed1351a2f7186.jpg', '1536994476', '1536994476', null);
