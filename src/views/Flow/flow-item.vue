<template>
  <div class="flow">
    <div class="flow-header">
      <img class="avatar" src="http://static-cdn.lxzmww.xyz/onechat/avatar/1578408726092" />
      <router-link to="/" class="owner">GemGem</router-link>
    </div>
    <div class="flow-content">
      <img class="album" src="http://static-cdn.lxzmww.xyz/onechat/image/1580398824140" />
      <div class="main-content">
        <div class="feature-buttons">
          <a-icon type="heart" />
          <a-icon type="message" style="margin-left: 10px;" />
          <a-icon type="share-alt" style="margin-left: 10px;" />
        </div>
        <div class="like">96.1万 次赞</div>
        <div class="content">
          <router-link to="/" class="owner">GemGem</router-link>好久不見，你好嗎？
        </div>
        <div class="comments">
          <router-link class="comments-count" to="/">全部 15689 条评论</router-link>
          <div class="comments-item">
            <router-link to="/" class="owner">GemGem3123</router-link>好久不見，你好嗎？
          </div>
          <div class="comments-item">
            <router-link to="/" class="owner">GemG4234asem</router-link>Hello!!!!!
          </div>
        </div>
        <div class="post-time">5天前</div>
      </div>
      <div class="reply">
        <div class="reply-input">
          <a-textarea placeholder="添加评论..." autosize />
        </div>
        <div class="reply-button">
          <a-button block>发布</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flow + .flow {
  margin-top: 20px;
}

.flow {
  border-radius: $borderRadius;
  border: 1px solid $borderColor;
  background: #fff;

  &-header {
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    border-bottom: 1px solid $panelBorderColor;
    background: $panelHeaderColor;
    border-top-left-radius: $borderRadius;
    border-top-right-radius: $borderRadius;

    .avatar {
      width: 28px;
      height: 28px;
      border-radius: 50% 50%;
      vertical-align: middle;
    }

    .owner {
      padding-left: 5px;
    }
  }

  &-content {
    overflow: hidden;

    .album {
      width: 100%;
    }

    .main-content {
      padding: 15px;

      .feature-buttons {
        font-size: 30px;
        height: 40px;
        line-height: 40px;
      }

      .like {
        height: 30px;
        line-height: 30px;
        font-weight: bold;
      }

      .content, .comments-item {
        .owner {
          font-weight: bold;
          padding-right: 10px;
        }
      }

      .post-time {
        padding-top: 5px;
        font-weight: 14px;
        color: $contentLightColor;
      }

      .comments {
        &-count {
          color: $contentLightColor;
        }
      }
    }

    .reply {
      position: relative;
      padding: 10px;
      border-top: 1px solid $borderColor;

      &-input {
        margin-right: 100px;
      }

      &-button {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 90px;
        text-align: center;
      }
    }
  }
}
</style>

