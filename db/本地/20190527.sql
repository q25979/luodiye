/*
 Navicat Premium Data Transfer

 Source Server         : luodiye
 Source Server Type    : MySQL
 Source Server Version : 50722
 Source Host           : 154.209.4.135:3306
 Source Schema         : luodiye

 Target Server Type    : MySQL
 Target Server Version : 50722
 File Encoding         : 65001

 Date: 27/05/2019 12:48:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ld_admin
-- ----------------------------
DROP TABLE IF EXISTS `ld_admin`;
CREATE TABLE `ld_admin`  (
  `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '后台管理员id',
  `username` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '管理员账号',
  `password` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '管理员密码',
  `identity` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '管理员身份 1-普通管理员 2-超级管理员 ',
  `login_ip` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '最近一次登录ip',
  `create_time` int(16) NULL DEFAULT NULL COMMENT '账号创建时间',
  `update_time` int(16) NULL DEFAULT NULL COMMENT '账号更新时间',
  `deleted_time` int(16) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`, `username`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '后台管理表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ld_admin
-- ----------------------------
INSERT INTO `ld_admin` VALUES (2, 'luodiye', 'cb16979fd5ba7497bbcec4b1157aad11', 1, '117.188.116.155', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for ld_data
-- ----------------------------
DROP TABLE IF EXISTS `ld_data`;
CREATE TABLE `ld_data`  (
  `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '数据id',
  `aid` int(8) NULL DEFAULT NULL COMMENT '上传者id',
  `wx_number` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '微信号',
  `wx_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '微信二维码',
  `type` varchar(8) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '1' COMMENT '分类 1,2  可能有很多',
  `remarks` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_time` int(16) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(16) NULL DEFAULT NULL COMMENT '更新时间',
  `deleted_time` int(16) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '数据库，存放微信号和二维码' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ld_url_configure
-- ----------------------------
DROP TABLE IF EXISTS `ld_url_configure`;
CREATE TABLE `ld_url_configure`  (
  `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '链接配置ID  可用作为页面类型(data->type)',
  `yid` int(8) NOT NULL COMMENT '页面模板id',
  `wtid` int(8) NOT NULL COMMENT '微信模板id',
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '链接地址',
  `port` int(6) NULL DEFAULT 80 COMMENT '端口默认80',
  `main` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'index.html' COMMENT '入口文件',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '链接状态  0-未生成  -1-生成失败  1-生成成功',
  `is_template` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '0-不是模板  1-是使用微信模板',
  `create_time` int(16) NULL DEFAULT NULL,
  `update_time` int(16) NULL DEFAULT NULL,
  `deleted_time` int(16) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '链接配置' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ld_wechat
-- ----------------------------
DROP TABLE IF EXISTS `ld_wechat`;
CREATE TABLE `ld_wechat`  (
  `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id',
  `wechat` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '微信号',
  `wxcode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '微信二维码',
  `remarks` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `status` tinyint(1) NULL DEFAULT 0 COMMENT '状态 0-启动 1-封号',
  `group` tinyint(2) UNSIGNED NULL DEFAULT NULL COMMENT '分组 1-A 2-B...',
  `create_time` int(16) NULL DEFAULT NULL,
  `update_time` int(16) NULL DEFAULT NULL,
  `deleted_time` int(16) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '微信管理表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ld_wxtemp
-- ----------------------------
DROP TABLE IF EXISTS `ld_wxtemp`;
CREATE TABLE `ld_wxtemp`  (
  `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '模板ID',
  `wid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '微信id多个按\',\'隔开',
  `name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '模板名称',
  `create_time` int(16) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` int(16) NULL DEFAULT NULL,
  `deleted_time` int(16) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '微信模板' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ld_ymtemp
-- ----------------------------
DROP TABLE IF EXISTS `ld_ymtemp`;
CREATE TABLE `ld_ymtemp`  (
  `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '页面模板id,',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '模板名称',
  `abspath` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '模板绝对路径',
  `create_time` int(16) NULL DEFAULT NULL,
  `update_time` int(16) NULL DEFAULT NULL,
  `deleted_time` int(16) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '页面模板' ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
