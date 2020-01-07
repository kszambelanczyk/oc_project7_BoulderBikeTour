require 'test_helper'

class RidersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @rider = riders(:one)
  end

  test "should get index" do
    get api_riders_url, xhr: true
    assert_response :success
    assert_equal "application/json", @response.media_type
    data = JSON.parse(@response.body)
    assert data.key?("riders")
  end

  test "should show rider" do
    get api_rider_url(@rider), xhr: true
    assert_response :success
    assert_equal "application/json", @response.media_type
    data = JSON.parse(@response.body)
    assert data.key?("rider")
  end

end
