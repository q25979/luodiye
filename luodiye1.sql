/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : video

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-10-01 11:57:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for vd_admin
-- ----------------------------
DROP TABLE IF EXISTS `vd_admin`;
CREATE TABLE `vd_admin` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL COMMENT '管理员账号',
  `password` varchar(32) NOT NULL COMMENT '管理员密码',
  `login_ip` varchar(32) DEFAULT NULL COMMENT '登录ip',
  `login_count` int(8) unsigned NOT NULL DEFAULT '0' COMMENT '登录次数',
  `create_time` int(32) unsigned DEFAULT NULL COMMENT '账号创建时间',
  `update_time` int(32) DEFAULT NULL COMMENT '更新时间',
  `deleted_time` int(32) DEFAULT NULL COMMENT '账号删除时间',
  PRIMARY KEY (`id`,`username`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='后台管理';

-- ----------------------------
-- Table structure for vd_slider
-- ----------------------------
DROP TABLE IF EXISTS `vd_slider`;
CREATE TABLE `vd_slider` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `img` varchar(255) DEFAULT NULL,
  `mimg` varchar(255) DEFAULT NULL,
  `sort` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '排序',
  `jump` varchar(255) DEFAULT NULL COMMENT '跳转地址',
  `create_time` int(32) DEFAULT NULL,
  `deleted_time` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='轮播图管理';

-- ----------------------------
-- Table structure for vd_statistics
-- ----------------------------
DROP TABLE IF EXISTS `vd_statistics`;
CREATE TABLE `vd_statistics` (
  `id` int(16) unsigned NOT NULL AUTO_INCREMENT,
  `browse_ip` varchar(64) DEFAULT NULL COMMENT '浏览人ip',
  `stop_time` int(32) DEFAULT NULL COMMENT '停留网站时间',
  `create_time` int(32) DEFAULT NULL,
  `deleted_time` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=392 DEFAULT CHARSET=utf8 COMMENT='数据统计表';

-- ----------------------------
-- Table structure for vd_type
-- ----------------------------
DROP TABLE IF EXISTS `vd_type`;
CREATE TABLE `vd_type` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL COMMENT '类别名称',
  `sort` int(4) unsigned NOT NULL DEFAULT '1' COMMENT '排序',
  `create_time` int(32) DEFAULT NULL COMMENT '创建日期',
  `update_time` int(32) DEFAULT NULL COMMENT '更新时间',
  `deleted_time` int(32) DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='类别表';

-- ----------------------------
-- Table structure for vd_video
-- ----------------------------
DROP TABLE IF EXISTS `vd_video`;
CREATE TABLE `vd_video` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `url` text NOT NULL COMMENT '视频地址',
  `img` text COMMENT '封面地址',
  `time` varchar(32) DEFAULT NULL COMMENT '视频播放时间',
  `title` varchar(255) DEFAULT NULL COMMENT '视频标题',
  `desc` text COMMENT '视频描述',
  `type` tinyint(2) NOT NULL DEFAULT '1' COMMENT '视频类型（根据类型表来定）',
  `fabulous` int(16) NOT NULL DEFAULT '0' COMMENT '点赞',
  `step_on` int(16) NOT NULL DEFAULT '0' COMMENT '踩',
  `watch_count` int(32) NOT NULL DEFAULT '0' COMMENT '观看次数',
  `is_hd` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1-代表高清  0-代表不是高清',
  `recommend` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '特别推荐',
  `create_time` int(32) DEFAULT NULL COMMENT '创建时间',
  `update_time` int(32) DEFAULT NULL COMMENT '更新时间',
  `deleted_time` int(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='视频表';
