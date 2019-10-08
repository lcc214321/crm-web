(function() {
	'use strict';

	angular.module('BlurAdmin.pages.interactmarket.smsgroupsend')
		.controller('smsgroupsendCtrl', function($scope, $location, $uibModal, $state, HttpService, Alert) {
			$scope.jump = function (page, size) {
				var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/pages/interactmarket/smsgroupsend/addsmsgroup.html',
                    controller: 'addsmsgroupCtrl',
                    size: 'midle-900',
                    backdrop:'static',
                    scope:$scope,
                    resolve: {
                       
                    }
                });
                modalInstance.result.then(function(){
                    // $scope.searchUser();
                    console.log(11111)
                });
				// $state.go('add');
//				$location.path('/interactmarket/smsgroupsend/add');
			};
			


			$scope.chooseModal = function (role) {
				$scope.roleObj.msgTopic = role.tplTitle
				$scope.roleObj.msgContent = role.tplCont
			}
			$scope.search = function (page) {
				// var page = page || 1;
				// $scope.queryOptions.pageSize = $scope.pagination.pageSize;
				this.queryPage(page)
			}
			$scope.groupSend = function () {
				if (!!!$scope.roleObj.msgTopic) {
					Alert.error('请填写短信标题');
					return
				}
				if (!!!$scope.roleObj.msgContent) {
					Alert.error('请填写短信内容');
					return
				}
				if (!$scope.roleObj.sendObj||$scope.roleObj.sendObj.length===0) {
					Alert.error('请选择群组');
					return
				}
				var sendOpts = {};
				var sendOptsObj = [];
				angular.forEach($scope.roleObj.sendObj,function(item){
					var itemObj = {}
					itemObj.msgTopic = $scope.roleObj.msgTopic;
					itemObj.msgContent = $scope.roleObj.msgContent;
					itemObj.sendObj = item.groupId;
					itemObj.bizNo = item.groupName;
					sendOptsObj.push(itemObj)
				})
				// sendOptsObj.groupIdList = $scope.roleObj.groupIdList;
				// sendOptsObj.tplCont = $scope.roleObj.tplCont;
				sendOpts.url = '/crm/supply/sendMsg';
				sendOpts.method = 'POST';
				sendOpts.data = sendOptsObj;
				HttpService.linkHttp(sendOpts).then(function (response) {
					if (response.status === '1') {
						Alert.success('发送成功')
						$scope.roleObj = {}
					}
				})

			}
            $scope.showGroupDetail = function(item) {
                // 静态群组
                $state.go('staticGroup', {
                    'groupId' : item.sendObj
                });
            }
			var init  = function () {
				$scope.rowCollection = [];
				$scope.roleObj = {}	
				$scope.searchObj = {} // 群组查询对象
				var opts = {};
				opts.url = '/crm/manage/msgmng/getMsgTemplateByEntity';
				opts.method = 'GET';
				// opts.params = $scope.searchObj;
				HttpService.linkHttp(opts).then(function(response) {
					$scope.RowCollection = response.data.list;
	                // $scope.total = response.data.length;
				});
				var queryGroupOpts = {};

				queryGroupOpts.url = '/crm/ocrm/CustGroupMng/getCustGrpByEntity';
				queryGroupOpts.method = 'GET';
				queryGroupOpts.params = $scope.searchObj;
				queryGroupOpts.params.sys = {};
				queryGroupOpts.params.sys.pageSize = '999999'
				HttpService.linkHttp(queryGroupOpts).then(function(response){
					$scope.groupListOptions = response.data.list;
					$scope.groupListOptions.forEach(function(item){
						item.label = item.groupName;
						item.value = item.groupId;
						return item
					})
				})

				$scope.queryOptions = {} // 短信记录查询对象
				$scope.queryOptions.pagination = {
                    pageSize:'10',
                    pageIndex:1,
                    maxText:5
                }
				$scope.queryOptions.url = '/crm/supply/getSmsSendList';
				$scope.queryOptions.method = 'POST';
				$scope.queryOptions.params = {}
				$scope.queryOptions.data = []
				$scope.queryOptions.params.sys = {};
				$scope.queryOptions.success = function successCallback (response) {
					if (response.status === '1') {
						$scope.rowCollection = response.data.list;
					}
				}

			}
			init()

	});
})();