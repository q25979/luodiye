/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : luodiye

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-09-27 19:50:26
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
-- Table structure for ld_data
-- ----------------------------
DROP TABLE IF EXISTS `ld_data`;
CREATE TABLE `ld_data` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '数据id',
  `aid` int(8) DEFAULT NULL COMMENT '上传者id',
  `wx_number` varchar(32) DEFAULT NULL COMMENT '微信号',
  `wx_code` varchar(255) DEFAULT NULL COMMENT '微信二维码',
  `type` tinyint(2) NOT NULL DEFAULT '1' COMMENT '分类 1,2  可能有很多',
  `remarks` varchar(255) DEFAULT NULL,
  `create_time` int(16) DEFAULT NULL COMMENT '创建时间',
  `update_time` int(16) DEFAULT NULL COMMENT '更新时间',
  `deleted_time` int(16) DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COMMENT='数据库，存放微信号和二维码';

-- ----------------------------
-- Table structure for ld_wechat
-- ----------------------------
DROP TABLE IF EXISTS `ld_wechat`;
CREATE TABLE `ld_wechat` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `wechat` varchar(255) DEFAULT NULL COMMENT '微信号',
  `wxcode` varchar(255) DEFAULT NULL COMMENT '微信二维码',
  `remarks` varchar(255) DEFAULT NULL COMMENT '备注',
  `status` tinyint(1) DEFAULT '0' COMMENT '状态 0-启动 1-封号',
  `group` tinyint(2) unsigned DEFAULT NULL COMMENT '分组 1-A 2-B...',
  `create_time` int(16) DEFAULT NULL,
  `update_time` int(16) DEFAULT NULL,
  `deleted_time` int(16) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='微信管理表';
