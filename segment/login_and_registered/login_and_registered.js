/*

*/
(function($){
	$(document).ready(function(){
		var init = {
			// 获取要使用的DOM元素
			classNameLR:{
				rule:$("#user_name_registered,#password_registered,#password_registered_confirm,#phone_registered,#registered_verification_code"),
				shutDown:$(".shut_down"),
				userName:$("#user_name_registered").val(),//用户名
				password:$("#password_registered").val(),//密码
				passwordConfirm:$("#password_registered_confirm").val(),//确认密码
				phone:$("#phone_registered").val(),//电话
				verificationCode:$("#registered_verification_code").val(),//验证码
				phoneVerification:$("#phone_verification").val(),//手机验证码
				loginProtocol:$("#login_protocol").val(),//勾选协议
				btnRegistered:$("#btn_registered")
			},
			// 主页面点击需要登录账号的选项，则在当页显示登录界面，背景为半透明
			showLogin:function(){
				$(".login_and_registered").css({
				 	display: "none"
				 });
				$(".obtainPage").css({
	                height: "0",
	                width: "0"
	             })
			},
			// 显示注册规则
			showRule:function(){
				var className = $(this).attr("data-name");
				if(className == ".userNameRule"){//用户名
					$(className).html("条件是以字母数字下划线组成，4到12位");
				}
				else if(className == ".passwordRule"){//密码
					$(className).html("条件是以字母数字下划线符号组成，8到16位");
				}
				else if(className == ".passwordRuleAgain"){//密码
					$(className).html("请再次输入密码");
				}
				else if(className == ".phoneRule"){//手机号
					$(className).html("完成验证后，你可以用该手机登录和找回密码");
				}
				else if(className == ".verificationRule"){//验证码
					$(className).html("看不清？点击图片更换验证码");
				}
			},
			// 隐藏注册规则
			hideRule:function(){
				var className = $(this).attr("data-name");
				if(className == ".userNameRule"){//用户名
					$(className).html(" ");
				}
				else if(className == ".passwordRule"){//密码
					$(className).html(" ");
				}
				else if(className == ".passwordRuleAgain"){//密码
					$(className).html(" ");
				}
				else if(className == ".phoneRule"){//手机号
					$(className).html(" ");
				}
				else if(className == ".verificationRule"){//验证码
					$(className).html(" ");
				}
			}
		};
		//显示事件发生的页面，实现登录
		init.classNameLR.shutDown.on("click",init.showLogin);
		//实现注册规则的隐现
		init.classNameLR.rule.on("focus",init.showRule);
		init.classNameLR.rule.on("blur",init.hideRule);
		//console.log(init.classNameLR.userName);
		//JSON.stringify(GetJsonData())
		$.ajax({
			url:"../../service/LocalCRUD/src/LocalCRUD.java",//待更改
			type:"post",
			cache:false,
			dataType:"json",
			data:{
				"city_id":11,
				"city_name":"大庆"
			},
			//dataTye:"json",
			success:function(resultData){
				console.log(resultData);
			},
			error:function(){

			}
		});






	})
}(window.jQuery));








































