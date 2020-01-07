require 'test_helper'

class RiderTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "should not save rider without required data" do
    rider = Rider.new
    assert_not rider.save
  end

end
