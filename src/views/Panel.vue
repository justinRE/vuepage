<template>

    <div class="container">
      <div class="row d-flex justify-content-center align-items-center mt-5">
        <div class="col-md-4">
          <div class="card h-100">
            <div class="card-body d-flex flex-column justify-content-center align-items-center" @click="openRedeemRewards()">
              <h5 class="card-title">Redeem Rewards</h5>
              <p class="card-text">Manage and redeem rewards for your customers.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100">
            <div class="card-body d-flex flex-column justify-content-center align-items-center" @click="openCustomers()">
              <h5 class="card-title">View and Edit Users</h5>
              <p class="card-text">View and edit user profiles and loyalty points.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100">
            <div class="card-body d-flex flex-column justify-content-center align-items-center" @click="openPunchCard()">
              <h5 class="card-title">Punch Card</h5>
              <p class="card-text">Punch your customers loyalty card.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </template>
  
  <script>
  export default {
    data() {
      return {};
    },
    methods: {
      openRedeemRewards() {},
      openCustomers() {},
      openPunchCard() {},
    },
  };
  </script>
  
  <style>

  </style>
  