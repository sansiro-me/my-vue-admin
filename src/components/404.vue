<template>
  <div class="page-error">
    <p class="why">Why?</p>
    <p class="error"><span>It's </span>404!</p>
  </div>
</template>

<style lang="scss" scoped>
.page-error {
  // line-height: 100%;
  width: 350px;
  margin: 200px auto 0;
}

.why {
  font-size: 100px;
  text-align: left;
}
.error {
  font-size: 100px;
  color: #8f2020;
  text-align: right;

  span {
    font-size: 50px;

    font-weight: bold;
    color: black;
  }
}
</style>