(function () {
  'use strict';

  angular.module('BlurAdmin.pages.profile')
    .controller('ProfileModalCtrl', ProfileModalCtrl);

  /** @ngInject */
  function ProfileModalCtrl($scope, $http, HttpService,$uibModalInstance, Alert) {
      // 用户对象
      $scope.msgTpl = {};
      // 查询条件对象
      $scope.searchObj = {};
      // 用户对象数据集
      $scope.RowCollection = [];
      $scope.smartTablePageSize = 5;
      // 查询事件
      $scope.search = function(page) {
          $scope.selectTmpOpts.params = $scope.searchObj;
          this.queryPage(page)
      }

      //发送模板
      $scope.radioRptOptions = {};
      $scope.radioRptOptions.select="";
      $scope.sendTemDts = {};
      $scope.sendTemDts.tplNo ="" ;  //模板编号
      $scope.sendTemDts.tplTitle ="" ;  //模板标题
      $scope.sendTemDts.tplCont ="" ;  //模板标题

		$scope.radioRptOptions = {};
        $scope.radioRptOptions.select="";
        // 单个选中
        $scope.selectRptOne = function(i) {
            angular.forEach($scope.RowCollection, function(i) {
                if($scope.radioRptOptions.select == i.tplNo){
                    $scope.sendTemDts.tplNo = i.tplNo ;  //模板编号
                    $scope.sendTemDts.tplCont =i.tplCont ;  //模板内容
                	return ;
                }
            });
        }
        $scope.selectRptRow = function(item) {
            $scope.radioRptOptions.select = item.tplNo;
        	$scope.sendTemDts = item;

        }

        $scope.restTpl = function() {
            $scope.sendTemDts.tplNo ="" ;  //模板编号
            $scope.sendTemDts.tplTitle ="" ;  //模板标题
        }

        $scope.ok = function () {
    			console.log(angular.toJson($scope.sendTemDts));
    	        if($scope.radioRptOptions.select ==""){
    	            Alert.error('请选择模板！');
    	            return ;
    	        }
    			$uibModalInstance.close($scope.sendTemDts);
        };
        var init = function(){
          $scope.selectTmpOpts = {
            pagination:{
              pageSize:10,
              pageIndex:1,
              maxText:5
            },
            url : '/crm/manage/msgmng/getMsgTemplateByEntity',
            method : 'GET',
            success: function(response){
              $scope.RowCollection = response.data.list;
            }
          }
        }
        init()

  }

})();