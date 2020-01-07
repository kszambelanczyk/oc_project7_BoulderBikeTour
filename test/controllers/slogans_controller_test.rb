require 'test_helper'

class SlogansControllerTest < ActionDispatch::IntegrationTest
  # setup do
  #   @slogan = slogans(:one)
  # end

  test "should create slogan" do
    assert_difference('Slogan.count') do
      post api_slogans_url, params: { slogan: { first_name: 'Bob', last_name: 'Dylan', email: 'bobdylan@example.com', slogan: 'example slogan' } }
    end

    assert_response :success
    assert_equal "application/json", @response.media_type
  end

end
