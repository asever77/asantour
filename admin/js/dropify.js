$(document).ready(function() {
  $(".dropify").dropify({
    messages: {
      default: '파일을 여기 끌어다 놓거나 클릭하십시오.',
      replace: '파일을 바꾸려면 드래그 앤 드롭하거나 클릭하십시오.',
      remove: '삭제',
      error: '죄송합니다. 파일이 너무 큽니다.'
    }
  });
});